import { Component, Input, ViewEncapsulation, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-json-editor-node-info',
  templateUrl: './node-info.component.html',
  styleUrls: ['./node-info.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class JsonEditorNodeInfoComponent implements OnInit {
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
  ngOnInit() {
    // eslint-disable-next-line no-console
    console.log(this.required);
  }
  updatePropertyName(name: string) {
    this.propertyNameChange.emit(name);
  }
}
