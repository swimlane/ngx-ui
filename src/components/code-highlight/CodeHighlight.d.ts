import { Renderer } from '@angular/core';
import 'highlight.js/lib/languages/python.js';
import 'highlight.js/lib/languages/sql.js';
import 'highlight.js/lib/languages/javascript.js';
import 'highlight.js/lib/languages/yaml.js';
import 'highlight.js/lib/languages/powershell.js';
import 'highlight.js/styles/atom-one-dark.css';
/**
 * Component for highlighting code syntax
 * Inspired by: https://github.com/Teradata/covalent/tree/cf9e24343c185ff2c5db2de0b797b536d6072e21/src/platform/highlight
 */
export declare class CodeHighlight {
    language: string;
    json: any;
    element: any;
    renderer: Renderer;
    content: any;
    constructor(renderer: Renderer);
    ngOnChanges(change: any): void;
    ngAfterViewInit(): void;
    prettify(contents: any): void;
}
