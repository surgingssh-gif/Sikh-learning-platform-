# Itihaas

Sikh history, from 1469 to today: short sourced lessons, quizzes, a timeline and a glossary in Gurmukhi, transliteration and English.

**Live site:** https://surgingssh-gif.github.io/Sikh-learning-platform-/

Built with Expo (React Native for web, iOS and Android), TypeScript and Expo Router, and deployed to GitHub Pages on every push to `main`. Project rules, design system and content format are in [CLAUDE.md](CLAUDE.md).

## Run locally

```
npm install
npm run content        # validate lessons and rebuild the content bundle
npx expo start --web
```

## Content status

Every lesson is a draft until it has been reviewed by a historian or a knowledgeable sevadar. Lessons live in `content/` as Markdown, so reviewers can suggest changes directly on GitHub.
