import { animate, state, style, transition, trigger } from '@angular/animations';
import type { BooleanInput } from '@angular/cdk/coercion';
import {
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
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { InputEnum } from '@swimlane/ngx-ui/decorators/input-enum';
import { DialogComponent } from '@swimlane/ngx-ui/dialog';
import type { EnumKey } from '@swimlane/ngx-ui/types';
import { AlertType } from '@swimlane/ngx-ui/types';
import { AlertOptions } from './models';

@Component({
  selector: 'ngx-alert',
  exportAs: 'ngxAlert',
  templateUrl: './alert.component.html',
  styleUrls: ['../../../dialog/src/lib/dialog.component.scss', './alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  ]
})
export class AlertComponent extends DialogComponent implements OnInit {
  static ngAcceptInputType_longPress: BooleanInput;

  @Input() data: any = '';
  @Input() confirmButtonText!: string;
  @Input() confirmButtonClass!: string | string[];
  @Input() cancelButtonText!: string;
  @Input() cancelButtonClass!: string | string[];

  @InputEnum(AlertType)
  @Input('type')
  _type!: EnumKey<typeof AlertType>;
  type!: AlertType;

  @InputBoolean()
  @Input()
  longPress = false;

  @Output() ok = new EventEmitter<{ data: any }>();
  @Output() cancel = new EventEmitter<{ data: any }>();

  @ViewChild('dialogContent', { static: true })
  readonly dialogElm!: ElementRef<HTMLDivElement>;

  readonly defaults: AlertOptions = {
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

  ngOnInit(): void {
    if (this.longPress) {
      this.closeButton = true;
    }
  }

  ngAfterViewInit(): void {
    if (this.type !== AlertType.Prompt) {
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
