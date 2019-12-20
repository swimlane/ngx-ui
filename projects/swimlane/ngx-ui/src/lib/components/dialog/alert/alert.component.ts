import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { DialogComponent } from '../dialog.component';
import { DialogOptions } from '../dialog-options.interface';
import { AlertTypes } from './alert-types.enum';

@Component({
  exportAs: 'ngxAlertDialog',
  selector: 'ngx-alert-dialog',
  templateUrl: './alert.component.html',
  styleUrls: ['../dialog.component.scss', './alert.component.scss'],
  animations: [
    trigger('visibilityTransition', [
      state(
        'active',
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)'
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'scale3d(1.2, 1.2, 1.2)'
        }),
        animate('0.2s ease-out')
      ]),
      transition('* => inactive', [
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)'
        }),
        animate(
          '0.2s ease-out',
          style({
            transform: 'scale3d(0.9, 0.9, 1)',
            opacity: 0
          })
        )
      ])
    ])
  ],
  host: {
    tabindex: '-1'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent extends DialogComponent {
  @Input() type: AlertTypes;
  @Input() data: any = '';

  @Input()
  get longPress() { return this._longPress; }
  set longPress(longPress) {
    this._longPress = coerceBooleanProperty(longPress);
  }

  @Output() ok = new EventEmitter<{ data: any }>();
  @Output() cancel = new EventEmitter<{ data: any }>();

  @ViewChild('dialogContent', { static: true })
  readonly dialogElm: ElementRef<HTMLDivElement>;

  readonly AlertTypes = AlertTypes;
  readonly defaults: DialogOptions = {
    inputs: {
      zIndex: 991,
      closeOnBlur: false,
      closeOnEscape: false,
      closeButton: false,
      showOverlay: true,
      visible: true,
      class: ''
    }
  };

  private _longPress?: boolean;

  ngOnInit(): void {
    if (this.type !== 'prompt') {
      this.dialogElm.nativeElement.focus();
    }

    if (this.longPress) {
      this.closeButton = true;
    }
  }

  onOkClick(): void {
    this.ok.emit({ data: this.data });
    this.hide();
  }

  onCancelClick(): void {
    this.cancel.emit({ data: this.data });
    this.hide();
  }

  onKeydown(): void {
    if (!this.longPress) {
      this.ok.emit({ data: this.data });
      this.hide();
    }
  }
}
