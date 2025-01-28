import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-code-editor-page',
  templateUrl: './code-editor-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CodeEditorPageComponent {
  editorResult: any;
  code = `var foo = true;
var bar = false;

function moo() {
  console.log(foo);
}
`;

  code2 = `<h1>{{header}}</h1>
{{#bug}}
{{/bug}}

{{#items}}
  {{#first}}
    <li><strong>{{name}}</strong></li>
  {{/first}}
  {{#link}}
    <li><a href="{{url}}">{{name}}</a></li>
  {{/link}}
{{/items}}

{{#empty}}
  <p>The list is empty.</p>
{{/empty}}
`;

  autocompleteTokens = [
    { text: '{{header}}', displayText: 'Header' },
    { text: '{{help}}', displayText: 'Help' },
    { text: '{{name}}', displayText: 'Name' },
    { text: '{{url}}', displayText: 'Url' },
    { text: '{{#link}} {{/link}}', displayText: 'Link' },
    { text: '{{#items}} {{/items}}', displayText: 'Items' },
    { text: '{{#first}} {{/first}}', displayText: 'First' },
    { text: '{{#bug}} {{/bug}}', displayText: 'Bug' }
  ];
}
