import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
  ViewEncapsulation,
} from '@angular/core';
import { BooleanInput, NgxBooleanInput } from '@swimlane/ngx-ui/common';
import { DialogComponent } from '@swimlane/ngx-ui/dialog';
import { EnumKey } from '@swimlane/ngx-ui/typings';
import { AlertType } from './enums';
import { AlertOptions } from './models';

@Component({
  selector: 'ngx-alert',
  exportAs: 'ngxAlert',
  templateUrl: './alert.component.html',
  styleUrls: [
    '../../../dialog/src/lib/dialog.component.scss',
    './alert.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('visibilityTransition', [
      state(
        'active',
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)',
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'scale3d(1.2, 1.2, 1.2)',
        }),
        animate('0.2s ease-out'),
      ]),
      transition('* => inactive', [
        style({
          opacity: 1,
          transform: 'scale3d(1, 1, 1)',
        }),
        animate(
          '0.2s ease-out',
          style({
            transform: 'scale3d(0.9, 0.9, 1)',
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class AlertComponent
  extends DialogComponent
  implements OnInit, AfterViewInit
{
  static ngAcceptInputType_longPress: BooleanInput;

  @Input() data = '';
  @Input() confirmButtonText = '';
  @Input() confirmButtonClass: string | string[] = '';
  @Input() cancelButtonText = '';
  @Input() cancelButtonClass: string | string[] = '';

  @NgxBooleanInput()
  @Input()
  longPress = false;

  @Input('type') set _type(v: EnumKey<typeof AlertType>) {
    this.type = AlertType[v];
  }

  type = AlertType.alert;

  @Output() ok = new EventEmitter<{ data: string }>();
  @Output() cancel = new EventEmitter<{ data: string }>();

  @ViewChild('dialogContent', { static: true })
  readonly dialogElm!: ElementRef<HTMLDivElement>;

  readonly AlertType = AlertType;

  readonly defaults: AlertOptions = {
    inputs: {
      zIndex: 991,
      closeOnBlur: false,
      closeOnEscape: false,
      closeButton: false,
      showOverlay: true,
      visible: true,
      class: '',
    },
  };

  constructor() {
    super();
  }

  ngOnInit(): void {
    if (this.longPress) {
      this.closeButton = true;
    }
  }

  ngAfterViewInit(): void {
    if (this.type !== AlertType.prompt) {
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
