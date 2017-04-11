// missing types
declare module 'highlight.js';
declare module 'zxcvbn';
declare module 'codemirror';

// webpack custom vars
declare const APP_VERSION: string;
declare const HMR: boolean;
declare const DEPS: boolean;
declare const IS_PRODUCTION: boolean;
declare const IS_DEV: boolean;

// system not in types
declare const System: any

// support for `import * as myJson from './foo.json';`
// https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#wildcard-character-in-module-names
declare module '*.html';
declare module '*.json';
declare module '*.css';
declare module '*.scss';

// native notifications		
// declare const Notification: any;

interface ErrorStackTraceLimit {
  stackTraceLimit: number;
}

interface ErrorConstructor extends ErrorStackTraceLimit {}

// HACK: This is only for demo page hmr
interface AppWindow {
  state: any;
}

interface Window extends AppWindow {}