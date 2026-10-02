import { useSyncExternalStore } from 'react';

const noop = () => () => {};

/** False during static rendering and hydration, true afterwards. Use for values that differ per visit (dates, storage). */
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}
