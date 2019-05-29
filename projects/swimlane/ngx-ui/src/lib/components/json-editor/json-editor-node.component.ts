import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ComponentRef
} from '@angular/core';

import { createValueForSchema, jsonSchemaDataTypes, inferType } from './json-editor.helper';
import { DialogComponent } from '../dialog/dialog.component';
import { DialogService } from '../dialog/dialog.service';

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

  @Input()
  typeCheckOverrides?: any;

  @Output()
  modelChange: EventEmitter<any> = new EventEmitter();

  @ViewChild('codeEditorTpl', { static: false }) codeEditorTpl: TemplateRef<any>;

  requiredCache: any = {};
  dataTypes: any[] = jsonSchemaDataTypes;
  expanded: boolean = true;

  ownErrors: any[];
  valid: boolean = true;

  childrenErrors: any[];
  childrenValid: boolean = true;

  editorDialog: ComponentRef<DialogComponent>;
  editorConfig = {
    lineNumbers: true,
    theme: 'dracula',
    mode: {
      label: 'Javascript',
      name: 'javascript',
      json: true
    }
  };
  editorModel: string = '';
  editorVisible: boolean = true;

  editorModes: any[] = [
    {
      label: 'Javascript',
      name: 'javascript',
      json: true
    },
    {
      label: 'YAML',
      name: 'yaml'
    },
    {
      label: 'Python',
      name: 'python'
    },
    {
      label: 'Powershell',
      name: 'powershell'
    },
    {
      label: 'HTML',
      name: 'htmlmixed'
    }
  ];

  constructor(public dialogMngr: DialogService) {}

  ngOnInit() {
    if (!this.schema) {
      this.schema = {
        ...inferType(this.model, this.typeCheckOverrides)
      };
    }

    if (this.schema.required) {
      for (const prop of this.schema.required) {
        this.requiredCache[prop] = true;
      }
    }

    if (Array.isArray(this.schema.type) && this.schema.type.length > 0) {
      if (!this.schema.$meta) {
        this.schema.$meta = {};
      }
      this.schema.$meta.type = [...this.schema.type];

      if (this.model !== undefined) {
        this.schema = {
          ...this.schema,
          ...inferType(this.model, this.typeCheckOverrides, this.schema.$meta.type)
        };
      } else {
        this.schema.type = this.schema.type[0];
        this.schema.$meta.currentType = this.schema.type;
      }
    }

    setTimeout(() => {
      this.initModel();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.errors) {
      this.processErrors();
    }
  }

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

  /**
   * Process the errors input to figure out whether it or any of its children are invalid
   */
  processErrors() {
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

  /**
   * Expand click event
   */
  onExpandClick() {
    this.expanded = !this.expanded;
  }

  /**
   * Opens the code editor dialog
   */
  openCodeEditor() {
    this.editorModel = this.model;
    this.editorDialog = this.dialogMngr.create({ template: this.codeEditorTpl, class: 'code-editor-dialog' });
  }

  /**
   * Closes the code editor dialog
   */
  closeCodeEditor() {
    this.dialogMngr.destroy(this.editorDialog);
  }

  /**
   * Sets the editor mode and refreshes the editor
   */
  selectEditorMode(modeName) {
    this.editorConfig.mode.name = modeName;
    this.editorConfig = { ...this.editorConfig };
    this.editorVisible = false;
    setTimeout(() => {
      this.editorVisible = true;
    });
  }
}
