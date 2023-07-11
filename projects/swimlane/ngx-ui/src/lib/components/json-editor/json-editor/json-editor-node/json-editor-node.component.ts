import { Component, ViewEncapsulation, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { JsonEditorNode } from '../../json-editor-node';

import { DialogService } from '../../../dialog/dialog.service';
import { JSONEditorSchema } from '../../json-editor.helper';
import { DateFormatPipe } from 'ngx-moment';

@Component({
  selector: 'ngx-json-editor-node',
  templateUrl: 'json-editor-node.component.html',
  styleUrls: ['./json-editor-node.component.scss'],
  providers: [DateFormatPipe],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JsonEditorNodeComponent extends JsonEditorNode implements OnInit {
  @Input() model: any;

  @Input() schema: JSONEditorSchema;

  @Input() typeCheckOverrides?: any;

  @Input() errors: any[];

  @Input() showKnownProperties = false;

  @Input() isDuplicated = false;

  @Input() passwordToggleEnabled = false;

  placeholder = '';

  constructor(public dialogMngr: DialogService, private dateFormat: DateFormatPipe) {
    super(dialogMngr);
  }

  ngOnInit() {
    super.ngOnInit();

    if (this.schema.examples && Array.isArray(this.schema.examples)) {
      this.placeholder = this.schema.examples.join(', ');
    }
  }

  updateDateTime(value: any): void {
    this.updateDateTimeModel(value, this.dateFormat);
  }
}
