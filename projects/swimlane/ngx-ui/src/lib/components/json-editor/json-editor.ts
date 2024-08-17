import {
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  Directive,
  OnInit
} from '@angular/core';
import { SchemaValidatorService } from './schema-validator.service';
import { JSONEditorSchema } from './json-editor.helper';
import { debounceable } from '../../decorators/debounceable/debounceable.decorator';
import { Format, InstanceOptions, KeywordDefinition } from 'ajv';

@Directive()
export class JsonEditor implements OnInit, OnChanges {
  @Input() model: any;

  @Input() schema: JSONEditorSchema;

  @Input() label: string;

  @Input() typeCheckOverrides?: any;

  @Input() schemaValidator?: (schema: any, ...args: any[]) => any[];

  @Input() showKnownProperties = false;

  @Input() ajvOptions?: InstanceOptions;

  @Input() additionalKeywords?: Array<string | KeywordDefinition>;

  @Input() additionalFormats?: Map<string, Format>;

  @Output() modelChange: EventEmitter<any> = new EventEmitter();

  @Output() schemaUpdate: EventEmitter<JSONEditorSchema> = new EventEmitter();

  errors: any[];

  constructor(protected schemaValidatorService: SchemaValidatorService, protected cdr: ChangeDetectorRef) {}

  /**
   * On component initialization, set Ajv options if provided
   */
  ngOnInit() {
    if (!this.schemaValidator && this.ajvOptions) {
      this.schemaValidatorService.setAjvOptions(this.ajvOptions);
    }
    if (this.additionalKeywords) {
      this.schemaValidatorService.addAjvKeywords(this.additionalKeywords);
    }
    if (this.additionalFormats) {
      this.schemaValidatorService.addAjvFormats(this.additionalFormats);
    }
  }

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
   *
   * @param model
   */
  modelChangedCallback(model: any) {
    this.validate(this.schema, model);
    this.modelChange.emit(model);
  }

  /**
   * Validates the model based on the schema
   *
   * @param schema
   * @param model
   */
  @debounceable(120)
  validate(schema: any, model: any): boolean {
    this.errors = this.schemaValidator
      ? this.schemaValidator(schema, model)
      : this.schemaValidatorService.validate(schema, model);
    this.cdr.markForCheck();

    return this.errors && this.errors.length > 0;
  }
}
