import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { JSONSchema7 } from 'json-schema';

interface ObjectProperty {
  key: number;
  value: {
    propertyName: string;
    description: string;
  }
}

@Component({
  selector: 'ngx-property-config',
  templateUrl: './property-config.component.html',
  styleUrls: ['./property-config.component.scss']
})
export class PropertyConfigComponent implements OnInit {
  @Input() property: ObjectProperty;
  @Input() propertyIndex: any[];
  @Input() schema: JSONSchema7;

  @Output() updateSchema = new EventEmitter()

  editableProperty: ObjectProperty;

  ngOnInit() {
    console.log(this.property);
    console.log(this.propertyIndex);
    console.log(this.schema);

    this.editableProperty = JSON.parse(JSON.stringify(this.property));
  }

  applyChanges(): void {
    // TODO update the rest

    this.updateSchema.emit({ schema: this.schema, newProperty: this.editableProperty, oldProperty: this.property });
  }
}