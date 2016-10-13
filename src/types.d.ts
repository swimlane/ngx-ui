declare module 'highlight.js';
declare module 'zxcvbn';

declare const APP_VERSION: string;
declare const HMR: boolean;
declare const System: any

// https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#wildcard-character-in-module-names
declare module '*.html';
declare module '*.json';

// HACK!
interface AppWindow {
  state: any;
}

interface Window extends AppWindow {}
