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

/**
 * Component for highlighting code syntax
 * Inspired by: https://github.com/Teradata/covalent/tree/cf9e24343c185ff2c5db2de0b797b536d6072e21/src/platform/highlight
 */
@Component({
  selector: 'code-highlight',
  template: `
    <pre>
      <code #highlight>
        <ng-content></ng-content>
      </code>
    </pre>
  `
})
export class CodeHighlight {

  @Input('lang') language: string = 'javascript';

  @ViewChild('highlight') content: ElementRef;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  ngAfterViewInit() {
    if (!this.language) {
      throw 'Error: language attribute must be defined in TdHighlightComponent.';
    }

    let codeElement = this.content.nativeElement;
    let code = codeElement.innerHTML;
    this.renderer.detachView([].slice.call(codeElement.childNodes));
    this.render(code, codeElement);
  }

  render(contents, codeElement) {
    let lines = contents.split('\n');

    // Remove empty lines
    lines = lines.filter(function(line: string): boolean {
      return line.trim().length > 0;
    });

    // Make it so each line starts at 0 whitespace
    let firstLineWhitespace = lines[0].match(/^\s*/)[0];
    let startingWhitespaceRegex = new RegExp('^' + firstLineWhitespace);
    lines = lines.map(function(line): string {
      return line
        .replace('=""', '') // remove empty values
        .replace(startingWhitespaceRegex, '')
        .replace(/\s+$/, '');
    });

    this.renderer.setElementClass(codeElement, 'highlight', true);

    let codeToParse = lines.join('\n')
      .replace(/\{ \{/gi, '{{').replace(/\} \}/gi, '}}')
       // replace with < and > to render HTML in angular 2
      .replace(/&lt;/gi, '<').replace(/&gt;/gi, '>');

    if (this.language === 'html') { // need to use CDATA for HTML
      this.renderer.createText(codeElement, codeToParse, undefined);
      hljs.highlightBlock(codeElement);
    } else {
      let highlightedCode = hljs.highlight(this.language, codeToParse, true);
      highlightedCode.value = highlightedCode.value
        .replace(/=<span class="hljs-value">""<\/span>/gi, '')
        .replace('<head>', '')
        .replace('<head/>', '');
      codeElement.innerHTML = highlightedCode.value;
    }
  }
}
