import { Component } from '@angular/core';

@Component({
  selector: 'app-code-editor-page',
  templateUrl: './code-editor-page.component.html'
})
export class CodeEditorPageComponent {
  editorResult: any;
  code = `
var foo = true;
var bar = false;

function moo() {
  console.log(foo);
}`;

  code2 = '';

  autocompleteTokens = [
    { text: '{{~title}}', displayText: 'title' },
    { text: '{{first_name}}', displayText: 'First Name' },
    { text: '{{last_name}}', displayText: 'Last Name' },
    { text: '{{#each [array] }}', displayText: 'each' },
    { text: '{{#with [object]}}', displayText: 'with' },
    { text: '{{#if [expression]}}', displayText: 'if' }
  ];
}
