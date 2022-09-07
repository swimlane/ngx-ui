import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnChanges,
  TemplateRef,
  OnDestroy
} from '@angular/core';
import { JsonEditorNode } from '../../json-editor-node';

import { DialogService } from '../../../dialog/dialog.service';
import { JSONEditorSchema, JSONEditorTemplateProperty, JsonSchemaDataType } from '../../json-editor.helper';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JSONSchema7TypeName } from 'json-schema';

@Component({
  selector: 'ngx-json-editor-node-flat',
  templateUrl: './json-editor-node-flat.component.html',
  styleUrls: ['./json-editor-node-flat.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonEditorNodeFlatComponent extends JsonEditorNode implements OnInit, OnChanges, OnDestroy {
  @Input() model: any;

  @Input() schema: JSONEditorSchema;

  @Input() typeCheckOverrides?: any;

  @Input() errors: any[];

  @Input() label: string;

  @Input() level: number;

  @Input() schemaBuilderMode?: boolean;

  @Input() schemaRef?: JSONEditorSchema;

  @Input() formats: JsonSchemaDataType[];

  @Input() arrayItem = false;

  @Input() hideRoot = false;

  @Input() arrayName = '';

  @Input() indentationArray: number[];

  @Input() showKnownProperties = false;

  @Input() isDuplicated = false;

  @Input() passwordToggleEnabled = false;

  @Input() inputControlTemplate: TemplateRef<unknown>;

  @Output() updatePropertyNameEvent = new EventEmitter<{ id: string | number; name: string }>();

  nextLevel = 0;

  contextItem: JSONEditorTemplateProperty = {};

  nodeChangeValue$ = new Subject();
  nodeExpandTrigger$ = new Subject<boolean>();
  private readonly unsub$: Subject<void> = new Subject();

  constructor(public dialogMngr: DialogService) {
    super(dialogMngr);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.nodeChangeValue$.pipe(takeUntil(this.unsub$)).subscribe((value: any) => this.updateModel(value));
    this.nodeExpandTrigger$.pipe(takeUntil(this.unsub$)).subscribe((value: boolean) => this.triggerExpand(value));
  }

  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if ('level' in changes || 'hideRoot' in changes) {
      this.nextLevel = this.level === undefined ? (this.hideRoot ? -1 : 0) : this.level + 1;
    }
    if ('schema' in changes || 'model' in changes) {
      const tempContext: JSONEditorTemplateProperty = {
        key: this.schema.propertyName,
        keyFieldType: this.schema.type as JSONSchema7TypeName,
        keyFieldFormat: this.schema.format,
        enum: this.schema.enum,
        value: this.model
      };
      this.contextItem = { ...tempContext };
    }
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }

  updatePropertyName(id: string | number, name: string): void {
    this.updatePropertyNameEvent.emit({ id, name });
  }

  triggerExpand(value: boolean): void {
    if (this.expanded !== value) {
      this.expanded = value;
    }
  }
}
