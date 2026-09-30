import { Redirect } from 'expo-router';

// Phase 1: the component gallery is the entry point until real screens land.
export default function Index() {
  return <Redirect href="/gallery" />;
}
