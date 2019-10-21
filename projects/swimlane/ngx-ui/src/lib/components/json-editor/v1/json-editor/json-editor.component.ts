import { Component, ViewEncapsulation } from '@angular/core';
import { JsonEditor } from '../../json-editor';

@Component({
  selector: 'ngx-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JsonEditorComponent extends JsonEditor {

}
