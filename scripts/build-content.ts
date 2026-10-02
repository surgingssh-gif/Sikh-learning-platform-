/// <reference types="node" />
/**
 * Validates everything in content/ and writes src/content/generated/content.json.
 * Fails (exit 1) on any schema error, unknown glossary id, unknown source id or bad quiz answer.
 * Run with: npm run content
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse as parseYaml } from 'yaml';

import {
  contentSchema,
  eventSchema,
  frontmatterSchema,
  mediaSchema,
  placeSchema,
  quizSchema,
  sourceSchema,
  termSchema,
  unitSchema,
  type Block,
  type Inline,
  type Lesson,
} from '../src/content/schema';

const root = join(__dirname, '..', 'content');
const errors: string[] = [];
const readJson = (p: string) => JSON.parse(readFileSync(p, 'utf8'));

const units = unitSchema.array().parse(readJson(join(root, 'units', 'units.json')));
const glossary = termSchema.array().parse(readJson(join(root, 'glossary', 'terms.json')));
const sources = sourceSchema.array().parse(readJson(join(root, 'sources', 'sources.json')));
const timeline = eventSchema.array().parse(readJson(join(root, 'timeline', 'events.json')));
const media = mediaSchema.array().parse(readJson(join(root, 'media', 'media.json')));
const places = placeSchema.array().parse(readJson(join(root, 'places', 'places.json')));
const termIds = new Set(glossary.map((t) => t.id));
const mediaIds = new Set(media.map((m) => m.id));
const assetsDir = join(__dirname, '..', 'assets', 'images');
for (const m of media) if (!existsSync(join(assetsDir, m.file))) errors.push(`media "${m.id}": file assets/images/${m.file} not found`);
const sourceIds = new Set(sources.map((s) => s.id));

/** `[[id|text]]` → term, `*text*` → em, everything else → text. */
function parseInline(src: string, where: string): Inline[] {
  const out: Inline[] = [];
  const re = /\[\[([a-z0-9-]+)\|([^\]]+)\]\]|\*([^*]+)\*/g;
  let last = 0;
  for (let m = re.exec(src); m; m = re.exec(src)) {
    if (m.index > last) out.push({ type: 'text', text: src.slice(last, m.index) });
    if (m[1]) {
      if (!termIds.has(m[1])) errors.push(`${where}: unknown glossary id "${m[1]}"`);
      out.push({ type: 'term', id: m[1], text: m[2] });
    } else {
      out.push({ type: 'em', text: m[3] });
    }
    last = m.index + m[0].length;
  }
  if (last < src.length) out.push({ type: 'text', text: src.slice(last) });
  return out;
}

function parseAttrs(s: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  for (const m of s.matchAll(/(\w+)="([^"]*)"/g)) attrs[m[1]] = m[2];
  return attrs;
}

function parseBody(body: string, where: string): Block[] {
  const blocks: Block[] = [];
  const lines = body.split('\n');
  let para: string[] = [];
  const flush = () => {
    if (para.length) blocks.push({ type: 'p', content: parseInline(para.join(' '), where) });
    para = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      flush();
      continue;
    }
    if (line.startsWith('## ')) {
      flush();
      blocks.push({ type: 'h2', text: line.slice(3).trim() });
      continue;
    }
    const dir = line.match(/^:::(\w+)\s*(.*)$/);
    if (dir) {
      flush();
      const inner: string[] = [];
      i++;
      while (i < lines.length && lines[i].trim() !== ':::') inner.push(lines[i++]);
      if (i >= lines.length) errors.push(`${where}: unclosed :::${dir[1]} block`);
      if (dir[1] === 'quote') {
        const a = parseAttrs(dir[2]);
        if (!a.gurmukhi || !a.translit || !a.english) errors.push(`${where}: quote needs gurmukhi, translit and english`);
        blocks.push({ type: 'quote', gurmukhi: a.gurmukhi ?? '', translit: a.translit ?? '', english: a.english ?? '', attribution: a.attribution });
      } else if (dir[1] === 'figure') {
        const a = parseAttrs(dir[2]);
        if (!a.id || !mediaIds.has(a.id)) errors.push(`${where}: figure needs a known media id, got "${a.id}"`);
        blocks.push({ type: 'figure', id: a.id ?? '' });
      } else if (dir[1] === 'perspectives') {
        const paras = inner.join('\n').split(/\n\s*\n/).map((p) => p.replace(/\n/g, ' ').trim()).filter(Boolean);
        blocks.push({ type: 'perspectives', content: paras.map((p) => parseInline(p, where)) });
      } else {
        errors.push(`${where}: unknown block :::${dir[1]}`);
      }
      continue;
    }
    para.push(line);
  }
  flush();
  return blocks;
}

const lessons: Lesson[] = [];
const unitsDir = join(root, 'units');
for (const unitDir of readdirSync(unitsDir, { withFileTypes: true }).filter((d) => d.isDirectory())) {
  const lessonsDir = join(unitsDir, unitDir.name, 'lessons');
  if (!existsSync(lessonsDir)) continue;
  for (const file of readdirSync(lessonsDir).filter((f) => f.endsWith('.md')).sort()) {
    const where = `${unitDir.name}/${file}`;
    const raw = readFileSync(join(lessonsDir, file), 'utf8');
    const fm = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!fm) {
      errors.push(`${where}: missing frontmatter`);
      continue;
    }
    const meta = frontmatterSchema.safeParse(parseYaml(fm[1]));
    if (!meta.success) {
      errors.push(`${where}: ${meta.error.message}`);
      continue;
    }
    for (const s of meta.data.sources) if (!sourceIds.has(s)) errors.push(`${where}: unknown source id "${s}"`);
    if (!mediaIds.has(meta.data.image)) errors.push(`${where}: unknown image id "${meta.data.image}"`);
    if (!units.some((u) => u.number === meta.data.unit)) errors.push(`${where}: unknown unit ${meta.data.unit}`);
    if (meta.data.status === 'approved' && !meta.data.reviewedBy) errors.push(`${where}: approved lessons need reviewedBy`);

    const quizPath = join(lessonsDir, file.replace(/\.md$/, '.quiz.json'));
    const quiz = existsSync(quizPath) ? quizSchema.safeParse(readJson(quizPath)) : null;
    if (!quiz) errors.push(`${where}: missing quiz file`);
    else if (!quiz.success) errors.push(`${where} quiz: ${quiz.error.message}`);
    else {
      if (quiz.data.lessonId !== meta.data.id) errors.push(`${where} quiz: lessonId does not match lesson id`);
      for (const q of quiz.data.questions)
        if (!q.options.some((o) => o.id === q.answer)) errors.push(`${where} quiz ${q.id}: answer "${q.answer}" is not an option`);
    }

    lessons.push({ ...meta.data, blocks: parseBody(fm[2], where), quiz: quiz?.success ? quiz.data.questions : [] });
  }
}

lessons.sort((a, b) => a.unit - b.unit || a.order - b.order);
const slugs = new Set<string>();
for (const l of lessons) {
  if (slugs.has(l.slug)) errors.push(`duplicate lesson slug "${l.slug}"`);
  slugs.add(l.slug);
}

for (const p of places)
  for (const slug of p.lessons) if (!slugs.has(slug)) errors.push(`place "${p.id}": unknown lesson "${slug}"`);

if (errors.length) {
  console.error(`Content build failed with ${errors.length} error(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}

const content = contentSchema.parse({ units, lessons, glossary, sources, timeline, media, places });
const outDir = join(__dirname, '..', 'src', 'content', 'generated');
writeFileSync(join(outDir, 'content.json'), JSON.stringify(content, null, 2) + '\n');
// Bundlers need literal require() calls for images, so write them out.
const requires = media.map((m) => `  ${JSON.stringify(m.id)}: require('../../../assets/images/${m.file}'),`).join('\n');
writeFileSync(join(outDir, 'images.ts'), `// Generated by scripts/build-content.ts. Do not edit.\nexport const images: Record<string, number> = {\n${requires}\n};\n`);
console.log(`Content OK: ${units.length} units, ${lessons.length} lessons, ${glossary.length} terms, ${timeline.length} timeline events, ${media.length} images, ${places.length} places.`);
