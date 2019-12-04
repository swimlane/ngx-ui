import {
  Component,
  Input,
  ViewEncapsulation,
  ContentChildren,
  QueryList,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { JsonEditorNodeComponent } from './json-editor-node.component';
import { SchemaValidatorService } from './schema-validator.service';

@Component({
  selector: 'ngx-json-editor',
  templateUrl: 'json-editor.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./json-editor.component.scss']
})
export class JsonEditorComponent implements OnChanges {
  @Input()
  model: any;

  @Input()
  schema: any;

  @Input()
  label: string;

  @Input()
  typeCheckOverrides?: any;

  @Input()
  schemaValidator?: (schema: any, ...args: any[]) => any[];

  @Output()
  modelChange: EventEmitter<any> = new EventEmitter();

  @Output()
  schemaChange: EventEmitter<any> = new EventEmitter();

  errors: any[];

  @ContentChildren(JsonEditorNodeComponent)
  nodeElms: QueryList<JsonEditorNodeComponent>;

  constructor(private schemaValidatorService: SchemaValidatorService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.schema) {
      this.schema = JSON.parse(JSON.stringify(this.schema));
    }

    if (!this.schema) {
      this.schema = {
        type: 'object'
      };
    }
    if (!this.schema.type) {
      this.schema.type = 'object';
    }
  }

  /**
   * Model change callback. Validates the model and emits a change event
   * @param model
   */
  modelChangedCallback(model: any) {
    this.validate(this.schema, model);
    this.modelChange.emit(model);
  }

  /**
   * Validates the model based on the schema
   * @param schema
   * @param model
   */
  validate(schema: any, model: any): boolean {
    this.errors = this.schemaValidator ? this.schemaValidator(schema, model) : this.schemaValidatorService.validate(schema, model);
    return this.errors && this.errors.length > 0;
  }
}