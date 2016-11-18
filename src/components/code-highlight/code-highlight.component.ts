import {
  Component,
  ViewChild,
  Input,
  Renderer
} from '@angular/core';

import * as hljs from 'highlight.js';
import 'highlight.js/lib/languages/python.js';
import 'highlight.js/lib/languages/sql.js';
import 'highlight.js/lib/languages/javascript.js';
import 'highlight.js/lib/languages/yaml.js';
import 'highlight.js/lib/languages/powershell.js';
// import 'highlight.js/styles/dracula.css';
// import './code-highlight.scss';

/**
 * Component for highlighting code syntax
 * Inspired by: https://github.com/Teradata/covalent
 */
@Component({
  selector: 'swui-code-highlight',
  template: `
    <pre class="hljs"><code #highlight><ng-content></ng-content></code></pre>
  `,
  host: {
    class: 'swui-code-highlight'
  }
})
export class CodeHighlightComponent {

  @Input() language = 'javascript';
  @Input() json;

  element: any;
  renderer: Renderer;

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
    const code = this.element.innerHTML;
    this.renderer.detachView([].slice.call(this.element.childNodes));
    this.prettify(code);
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
