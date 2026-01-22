import {
  Component,
  ViewEncapsulation,
  ContentChildren,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { JsonEditor } from '../json-editor';
import { SchemaValidatorService } from '../schema-validator.service';
import { JsonEditorNodeComponent } from './json-editor-node/json-editor-node.component';
import { JSONEditorSchema } from '../json-editor.helper';

import type { QueryList } from '@angular/core';

@Component({
  selector: 'ngx-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class JsonEditorComponent extends JsonEditor {
  @Input() model: any;

  @Input() schema: JSONEditorSchema;

  @Input() typeCheckOverrides?: any;

  @Input() passwordToggleEnabled = false;

  @ContentChildren(JsonEditorNodeComponent)
  nodeElms: QueryList<JsonEditorNodeComponent>;

  constructor(protected schemaValidatorService: SchemaValidatorService, protected cdr: ChangeDetectorRef) {
    super(schemaValidatorService, cdr);
  }
}
