import { Component, ViewEncapsulation, Input, ViewChild, TemplateRef } from '@angular/core';
import { ObjectNode } from '../../../../node-types/object-node.component';
import { DialogService } from '../../../../../dialog/dialog.service';

@Component({
  selector: 'ngx-json-object-node-flat',
  templateUrl: './object-node-flat.component.html',
  styleUrls: ['./object-node-flat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ObjectNodeFlatComponent extends ObjectNode {
  @ViewChild('propertyConfigTmpl', { static: false }) propertyConfigTmpl: TemplateRef<any>;

  @Input() level: number;
  @Input() schemaBuilderMode: boolean;

  constructor(private dialogService: DialogService) {
    super();
  }

  onPropertyConfig(property: unknown, event: MouseEvent): void {
    this.dialogService.create({
      template: this.propertyConfigTmpl,
      context: {
        property,
        propertyIndex: this.propertyIndex,
        schema: this.schema,
      },
      class: 'property-config-dialog'
    });
  }

  openDialog(options) {
    this.dialogService.create(options);
  }
}
