declare module 'highlight.js';
declare module 'zxcvbn';

declare var APP_VERSION: string;
declare var HMR: boolean;

// https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#wildcard-character-in-module-names
declare module '*.html';
declare module '*.json';

// HACK!
interface AppWindow {
    state: any;
}

interface Window extends AppWindow {}
