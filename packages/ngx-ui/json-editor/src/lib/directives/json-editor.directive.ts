import { ChangeDetectorRef, Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Debounceable } from '@swimlane/ngx-ui/decorators/debounceable';
import type { JSONEditorSchema } from '../interfaces';
import { SchemaValidatorService } from '../services';

@Directive()
export class JsonEditor implements OnChanges {
  @Input() model: any;

  @Input() schema!: JSONEditorSchema;

  @Input() label?: string;

  @Input() typeCheckOverrides?: any;

  @Input() schemaValidator?: (schema: any, ...args: any[]) => any[];

  @Input() showKnownProperties = false;

  @Output() modelChange: EventEmitter<any> = new EventEmitter();

  @Output() schemaUpdate: EventEmitter<JSONEditorSchema> = new EventEmitter();

  errors: any[] = [];

  constructor(
    protected readonly schemaValidatorService: SchemaValidatorService,
    protected readonly cdr: ChangeDetectorRef
  ) {}

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
  @Debounceable(120)
  validate(schema: any, model: any): boolean {
    this.errors = this.schemaValidator
      ? this.schemaValidator(schema, model)
      : this.schemaValidatorService.validate(schema, model)!;
    this.cdr.markForCheck();

    return this.errors && this.errors.length > 0;
  }
}
