import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import type { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import type { NumericInput } from '@swimlane/ngx-ui/decorators/input-numeric';
import { InputNumeric } from '@swimlane/ngx-ui/decorators/input-numeric';

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
})
export class OverlayComponent {
  static ngAcceptInputType_visible: BooleanInput;
  static ngAcceptInputType_zIndex: NumericInput;

  @InputBoolean()
  @Input()
  visible = false;

  @InputNumeric(990)
  @Input()
  zIndex = 990;

  @Output() click = new EventEmitter<boolean>();

  get animationState(): string {
    return this.visible ? 'active' : 'inactive';
  }
}
