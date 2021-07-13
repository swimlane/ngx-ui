import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  BooleanInput,
  DestroyedService,
  NgxBooleanInput,
  NgxNumericInput,
  NumericInput,
} from '@swimlane/ngx-ui/common';

@Component({
  selector: 'ngx-overlay',
  exportAs: 'ngxOverlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('overlayTransition', [
      state(
        'active',
        style({
          opacity: 0.8,
          visibility: 'visible',
        })
      ),
      state(
        'inactive',
        style({
          visibility: 'hidden',
          opacity: 0,
        })
      ),
      transition('* => active', [animate('100ms ease-in')]),
      transition('* => inactive', [animate('100ms ease-out')]),
      transition('* => void', [
        style({
          opacity: 0,
          visibility: 'hidden',
          'pointer-events': 'none',
        }),
        animate('100ms ease-out'),
      ]),
    ]),
  ],
  providers: [DestroyedService],
})
export class OverlayComponent implements OnChanges {
  static ngAcceptInputType_visible: BooleanInput;
  static ngAcceptInputType_zIndex: NumericInput;

  @NgxBooleanInput()
  @Input()
  visible = false;

  @NgxNumericInput(990)
  @Input()
  zIndex = 990;

  @Output() overlayClick = new EventEmitter<boolean>();

  get animationState(): string {
    return this.visible ? 'active' : 'inactive';
  }

  constructor(
    public readonly destroyed: DestroyedService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnChanges() {
    this.cdr.markForCheck();
  }
}
