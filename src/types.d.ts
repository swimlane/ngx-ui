// missing types
declare module 'highlight.js';
declare module 'zxcvbn';

// webpack custom vars
declare const APP_VERSION: string;
declare const HMR: boolean;
declare const DEPS: boolean;

// system not in types
declare const System: any

// support for `import * as myJson from './foo.json';`
// https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#wildcard-character-in-module-names
declare module '*.html';
declare module '*.json';

// HACK: This is only for demo page hmr
interface AppWindow {
  state: any;
}

interface Window extends AppWindow {}
