import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

/**
 * Overlay Component for Drawer/Dialogs
 */
@Component({
  selector: 'ngx-overlay',
  template: `
    <div (click)="click.emit(true)" [style.zIndex]="zIndex" [@overlayTransition]="animationState" class="ngx-overlay">
      <ng-content></ng-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent {
  @Output() click: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _zIndex: number = 990;
  private _visible: boolean = false;

  constructor(private cd: ChangeDetectorRef) {}

  get animationState(): string {
    return this.visible ? 'active' : 'inactive';
  }

  get visible(): boolean {
    return this._visible;
  }

  @Input() set visible(val: boolean) {
    this._visible = val;
    this.cd.markForCheck();
  }

  get zIndex(): number {
    return this._zIndex;
  }

  set zIndex(val: number) {
    this.cd.markForCheck();
    this._zIndex = val;
  }
}
