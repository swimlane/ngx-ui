import {
  Component,
  ViewChild,
  ElementRef,
  Input,
  Renderer
} from '@angular/core';

import hljs from 'highlight.js';
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
@Component({
  selector: 'code-highlight',
  template: `
    <pre><code #highlight><ng-content></ng-content></code></pre>
  `
})
export class CodeHighlight {

  @Input() language = 'javascript';
  @Input() json;

  @ViewChild('highlight') content;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  ngOnChanges(change) {
    if(change.json && change.json.currentValue) {
      const value = change.json.currentValue;
      const str = JSON.stringify(value, null, ' ');
      this.prettify(str);
    }
  }

  ngAfterViewInit() {
    this.element = this.content.nativeElement;
    this.renderer.detachView([].slice.call(this.element.childNodes));
    this.prettify(this.element.innerHTML);
  }

  prettify(contents) {
    // ensure load
    if(!this.element) return;

    let lines = contents.split('\n');

    // Remove empty lines
    lines = lines.filter(function(line) {
      return line.trim().length > 0;
    });

    // don't mess w/ empties
    if(!lines.length) return;

    // Make it so each line starts at 0 whitespace
    let firstLineWhitespace = lines[0].match(/^\s*/)[0];
    let startingWhitespaceRegex = new RegExp('^' + firstLineWhitespace);
    lines = lines.map(function(line) {
      return line
        .replace('=""', '') // remove empty values
        .replace(startingWhitespaceRegex, '')
        .replace(/\s+$/, '');
    });

    this.renderer.setElementClass(this.element, 'highlight', true);

    let codeToParse = lines.join('\n')
      .replace(/\{ \{/gi, '{{').replace(/\} \}/gi, '}}')
       // replace with < and > to render HTML in angular 2
      .replace(/&lt;/gi, '<').replace(/&gt;/gi, '>');

    if (this.language === 'html') { // need to use CDATA for HTML
      this.renderer.createText(this.element, codeToParse, undefined);
      hljs.highlightBlock(this.element);
    } else {
      let highlightedCode = hljs.highlight(this.language, codeToParse, true);
      highlightedCode.value = highlightedCode.value
        .replace(/=<span class="hljs-value">""<\/span>/gi, '')
        .replace('<head>', '')
        .replace('<head/>', '');
      this.element.innerHTML = highlightedCode.value;
    }
  }
}
