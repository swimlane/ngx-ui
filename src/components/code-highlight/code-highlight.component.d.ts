import { Renderer } from '@angular/core';
import 'highlight.js/lib/languages/python.js';
import 'highlight.js/lib/languages/sql.js';
import 'highlight.js/lib/languages/javascript.js';
import 'highlight.js/lib/languages/yaml.js';
import 'highlight.js/lib/languages/powershell.js';
import 'highlight.js/styles/dracula.css';
import './code-highlight.scss';
/**
 * Component for highlighting code syntax
 * Inspired by: https://github.com/Teradata/covalent
 */
export declare class CodeHighlightComponent {
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
