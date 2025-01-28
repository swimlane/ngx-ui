import { animate, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DialogOptions } from '../dialog-options.interface';

import { DialogComponent } from '../dialog.component';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AlertComponent extends DialogComponent implements AfterViewInit, OnInit {
  @Input() type: AlertTypes;
  @Input() data: any = '';
  @Input() confirmButtonText: string;
  @Input() confirmButtonClass: string | string[];
  @Input() cancelButtonText: string;
  @Input() cancelButtonClass: string | string[];

  @Input()
  get longPress() {
    return this._longPress;
  }

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
    if (this.longPress) {
      this.closeButton = true;
    }
  }

  ngAfterViewInit(): void {
    if (this.type !== AlertTypes.Prompt) {
      this.dialogElm.nativeElement.focus();
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
