import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { JsonEditor } from '../directives';
import { JSONEditorSchema } from '../interfaces';
import { SchemaValidatorService } from '../services';
import { JsonEditorNodeComponent } from './json-editor-node/json-editor-node.component';

@Component({
  selector: 'ngx-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonEditorComponent extends JsonEditor {
  @Input() model: any;

  @Input() schema!: JSONEditorSchema;

  @Input() typeCheckOverrides?: any;

  @ContentChildren(JsonEditorNodeComponent)
  nodeElms?: QueryList<JsonEditorNodeComponent>;

  constructor(schemaValidatorService: SchemaValidatorService, cdr: ChangeDetectorRef) {
    super(schemaValidatorService, cdr);
  }
}
