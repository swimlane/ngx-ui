declare module 'highlight.js';
declare module 'zxcvbn';

declare var APP_VERSION: string;
declare var HMR: boolean;

// HACK!
interface AppWindow {
    state: any;
}

interface Window extends AppWindow {}
