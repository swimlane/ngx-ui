import {
  Component,
  ViewEncapsulation,
  ContentChildren,
  QueryList,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { JsonEditor } from '../json-editor';
import { SchemaValidatorService } from '../schema-validator.service';
import { JsonEditorNodeComponent } from './json-editor-node/json-editor-node.component';
import { JSONEditorSchema } from '../json-editor.helper';

@Component({
  selector: 'ngx-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonEditorComponent extends JsonEditor {
  @Input() model: any;

  @Input() schema: JSONEditorSchema;

  @Input() typeCheckOverrides?: any;

  @ContentChildren(JsonEditorNodeComponent)
  nodeElms: QueryList<JsonEditorNodeComponent>;

  constructor(protected schemaValidatorService: SchemaValidatorService, protected cdr: ChangeDetectorRef) {
    super(schemaValidatorService, cdr);
  }
}
