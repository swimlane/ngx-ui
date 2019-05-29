import { Component } from '@angular/core';

@Component({
  selector: 'app-code-editor-page',
  templateUrl: './code-editor-page.component.html'
})
export class CodeEditorPageComponent {
  editorResult: any;
  code = `var foo = true;
  var bar = false;
  
  function moo() {
    console.log(foo);
  }`;

  editorConfig = {
    lineNumbers: true,
    theme: 'dracula',
    mode: {
      name: 'javascript',
      json: true
    }
  };
}
