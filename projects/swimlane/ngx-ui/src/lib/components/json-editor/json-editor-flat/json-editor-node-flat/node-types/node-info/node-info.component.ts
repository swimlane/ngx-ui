import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-json-editor-node-info',
  templateUrl: './node-info.component.html',
  styleUrls: ['./node-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class JsonEditorNodeInfoComponent {
  @Input()
  nameEditable = false;

  @Input()
  required = false;

  @Input()
  title: string;

  @Input()
  propertyName: string;

  @Input()
  description: string;

  @Input()
  type: string;

  @Input()
  examples: string[];

  @Output() propertyNameChange = new EventEmitter<string>();

  updatePropertyName(name: string) {
    this.propertyNameChange.emit(name);
  }
}
