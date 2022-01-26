// webpack custom vars
declare const APP_VERSION: string;
declare const HMR: boolean;
declare const DEPS: boolean;
declare const IS_PRODUCTION: boolean;
declare const IS_DEV: boolean;

// system not in types
// eslint-disable-next-line @typescript-eslint/naming-convention
declare const System: any;

// support for `import * as myJson from './foo.json';`
// https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#wildcard-character-in-module-names
declare module '*.html';
declare module '*.css';
declare module '*.scss';
