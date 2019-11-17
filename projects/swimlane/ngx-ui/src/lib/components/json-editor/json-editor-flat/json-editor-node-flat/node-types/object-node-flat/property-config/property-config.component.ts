import { Component, OnInit, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { JSONSchema7 } from 'json-schema';
import { DialogService } from '../../../../../../dialog/dialog.service';

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
  styleUrls: ['./property-config.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PropertyConfigComponent implements OnInit {
  @Input() property: ObjectProperty;
  @Input() propertyIndex: any[];
  @Input() schema: JSONSchema7;

  @Output() updateSchema = new EventEmitter()

  editableProperty: ObjectProperty;

  required = false;

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
    console.log(this.property);
    console.log(this.propertyIndex);
    console.log(this.schema);

    this.editableProperty = JSON.parse(JSON.stringify(this.property));
    this.setRequired();
  }

  applyChanges(): void {
    // TODO update the rest
    this.dialogService.destroyAll();
    this.updateSchema.emit({ schema: this.schema, required: this.required, newProperty: this.editableProperty, oldProperty: this.property });
  }

  private setRequired(): void {
    this.required = this.schema.required.includes(this.property.value.propertyName);
  }
}