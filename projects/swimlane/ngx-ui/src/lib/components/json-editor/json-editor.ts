import {
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { SchemaValidatorService } from './schema-validator.service';

export class JsonEditor implements OnChanges {
  @Input() model: any;

  @Input() schema: any;

  @Input() label: string;

  @Input() typeCheckOverrides?: any;

  @Output() modelChange: EventEmitter<any> = new EventEmitter();

  @Output() schemaChange: EventEmitter<any> = new EventEmitter();

  errors: any[];

  constructor(protected schemaValidatorService: SchemaValidatorService) { }

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
    this.errors = this.schemaValidatorService.validate(schema, model);
    return this.errors && this.errors.length > 0;
  }
}
