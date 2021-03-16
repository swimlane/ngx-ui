import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-json-editor-node-info',
  templateUrl: './node-info.component.html',
  styleUrls: ['./node-info.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeInfoComponent {
  @Input()
  nameEditable = false;

  @Input()
  title?: string;

  @Input()
  propertyName?: string;

  @Input()
  description?: string;

  @Input()
  type?: string;

  @Input()
  examples: string[] = [];

  @Input()
  compressed = false;

  @Output() propertyNameChange = new EventEmitter<string>();
}
