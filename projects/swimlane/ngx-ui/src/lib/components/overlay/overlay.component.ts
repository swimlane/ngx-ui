import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

/**
 * Overlay Component for Drawer/Dialogs
 */
@Component({
  selector: 'ngx-overlay',
  exportAs: 'ngxOverlay',
  templateUrl: './overlay.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./overlay.component.scss'],
  animations: [
    trigger('overlayTransition', [
      state(
        'active',
        style({
          opacity: 0.8,
          visibility: 'visible'
        })
      ),
      state(
        'inactive',
        style({
          visibility: 'hidden',
          opacity: 0
        })
      ),
      transition('* => active', [animate('100ms ease-in')]),
      transition('* => inactive', [animate('100ms ease-out')]),
      transition('* => void', [
        style({
          opacity: 0,
          visibility: 'hidden',
          'pointer-events': 'none'
        }),
        animate('100ms ease-out')
      ])
    ])
  ]
})
export class OverlayComponent {
  get visible() {
    return this._visible;
  }
  @Input()
  set visible(val: boolean) {
    this._visible = coerceBooleanProperty(val);
  }

  get zIndex() {
    return this._zIndex;
  }
  @Input()
  set zIndex(val: number) {
    this._zIndex = coerceNumberProperty(val);
  }

  @Output() click = new EventEmitter();

  private _visible: boolean = false;
  private _zIndex: number = 990;

  get animationState(): string {
    return this.visible ? 'active' : 'inactive';
  }
}
