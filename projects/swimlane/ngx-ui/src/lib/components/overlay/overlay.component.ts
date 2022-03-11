import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

/**
 * Overlay Component for Drawer/Dialogs
 */
@Component({
  exportAs: 'ngxOverlay',
  selector: 'ngx-overlay',
  template: '<ng-content></ng-content>',
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
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent {
  @HostBinding('class.ngx-overlay')
  overlay = true;

  @HostBinding('class.root')
  @Input()
  get visible() {
    return this._visible;
  }
  set visible(val: boolean) {
    this._visible = coerceBooleanProperty(val);
    this.cdr.markForCheck();
  }

  @HostBinding('style.zIndex')
  @Input()
  get zIndex() {
    return this._zIndex;
  }
  set zIndex(val: number) {
    this._zIndex = coerceNumberProperty(val);
    this.cdr.markForCheck();
  }

  @HostBinding('class.fullscreen')
  @Input()
  fullscreen = true;

  @Output() click = new EventEmitter<boolean>();

  @HostBinding('@overlayTransition')
  get animationState(): string {
    return this.visible ? 'active' : 'inactive';
  }

  private _visible = false;
  private _zIndex = 990;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  @HostListener('click')
  onClick() {
    this.click.emit(true);
  }
}
