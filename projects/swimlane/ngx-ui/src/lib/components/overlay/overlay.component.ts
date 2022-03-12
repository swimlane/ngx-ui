import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { CoerceBooleanProperty } from '../../utils/coerce/coerce-boolean';
import { CoerceNumberProperty } from '../../utils/coerce/coerce-number';

/**
 * Overlay Component for Drawer/Dialogs
 */
@Component({
  exportAs: 'ngxOverlay',
  selector: 'ngx-overlay',
  template: '<ng-content></ng-content>',
  styleUrls: ['./overlay.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent {
  @HostBinding('class.ngx-overlay')
  overlay = true;

  @HostBinding('class.visible')
  @Input()
  @CoerceBooleanProperty()
  visible = false;

  @HostBinding('style.zIndex')
  @Input()
  @CoerceNumberProperty()
  zIndex = 990;

  @HostBinding('class.fullscreen')
  @Input()
  @CoerceBooleanProperty()
  fullscreen = true;

  @Output() overlayClick = new EventEmitter<boolean>();

  @HostListener('click')
  onClick() {
    this.overlayClick.emit(true);
  }
}
