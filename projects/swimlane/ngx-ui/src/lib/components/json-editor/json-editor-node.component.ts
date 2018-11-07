import { Component, Input, EventEmitter, Output, OnInit, OnChanges } from '@angular/core';

import { createValueForSchema, jsonSchemaDataTypes, inferType } from './json-editor.helper';

@Component({
  selector: 'ngx-json-editor-node',
  templateUrl: 'json-editor-node.component.html'
})
export class JsonEditorNodeComponent implements OnInit, OnChanges {
  @Input()
  schema: any;

  @Input()
  model: any;

  @Input()
  required: boolean = false;

  @Input()
  inline: boolean = false;

  @Input()
  path: string = '';

  @Input()
  errors: any[];

  @Output()
  modelChange: EventEmitter<any> = new EventEmitter();

  requiredCache: any = {};
  dataTypes: any[] = jsonSchemaDataTypes;
  expanded: boolean = true;

  ownErrors: any[];
  valid: boolean = true;

  childrenErrors: any[];
  childrenValid: boolean = true;

  /**
   * Inits the model if it is not defined
   */
  initModel() {
    if (this.model !== undefined) {
      return;
    }

    if (!this.schema) {
      return;
    }

    const value: any = createValueForSchema(this.schema);

    if (value !== undefined) {
      this.updateModel(value);
    }
  }

  ngOnChanges() {
    this.ownErrors = [];
    this.childrenErrors = [];
    if (this.errors && this.errors.length) {
      this.ownErrors = this.errors.filter(e => {
        return e.dataPath === this.path;
      });

      this.childrenErrors = this.errors.filter(e => {
        return e.dataPath.startsWith(this.path);
      });
    }
    this.childrenValid = this.childrenErrors.length === 0;
    this.valid = this.ownErrors.length === 0;
  }

  /**
   * Updates the whole model and emits the change event
   * @param value
   */
  updateModel(value: any) {
    this.model = value;
    this.modelChange.emit(this.model);
  }

  ngOnInit() {
    if (!this.schema) {
      this.schema = {
        type: inferType(this.model)
      };
    }

    if (this.schema && this.schema.required) {
      for (const prop of this.schema.required) {
        this.requiredCache[prop] = true;
      }
    }

    setTimeout(() => {
      this.initModel();
    });
  }

  /**
   * Expand click event
   */
  onExpandClick() {
    this.expanded = !this.expanded;
  }
}
