import { defineConfig } from 'vite';
import { resolve } from 'path';

// Per-component entries aligned with src/index.ts exports; each produces a self-contained CDN script.
const COMPONENT_NAMES = [
  'button',
  'button-group',
  'button-toggle',
  'calendar',
  'card',
  'checkbox',
  'date-time',
  'dialog',
  'drawer',
  'icon',
  'input',
  'section',
  'radio',
  'select',
  'slider',
  'split',
  'progress-spinner',
  'tabs',
  'toggle',
  'tooltip',
  'navbar',
  'list'
] as const;

function buildLibEntries(): Record<string, string> {
  const root = __dirname;
  const entries: Record<string, string> = {
    'swim-ui': resolve(root, 'src/index.ts')
  };
  for (const name of COMPONENT_NAMES) {
    entries[name] = resolve(root, `src/components/${name}/index.ts`);
  }
  entries['styles'] = resolve(root, 'src/styles/index.ts');
  return entries;
}

/** All CDN entry names in build order (full bundle first, then components, then styles). */
export const CDN_ENTRY_NAMES = ['swim-ui', ...COMPONENT_NAMES, 'styles'];

function getEntryForSingleBuild(singleEntryName: string): Record<string, string> {
  const all = buildLibEntries();
  if (!(singleEntryName in all)) throw new Error(`Unknown CDN entry: ${singleEntryName}`);
  return { [singleEntryName]: all[singleEntryName] };
}

export default defineConfig(() => {
  const singleEntry = process.env.BUILD_CDN_ENTRY;
  const entries = singleEntry ? getEntryForSingleBuild(singleEntry) : buildLibEntries();
  return {
    build: {
      lib: {
        entry: entries,
        formats: ['es']
      },
      outDir: 'dist-cdn',
      emptyOutDir: !singleEntry,
      rollupOptions: {
        output: {
          format: 'es',
          entryFileNames: '[name].js'
        }
      }
    }
  };
});
