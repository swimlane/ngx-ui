import { ConnectedPosition, Overlay, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { DomPortal } from '@angular/cdk/portal';
import { Directive, DoCheck, ElementRef, Input, NgZone, OnDestroy, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';

import { CoerceBooleanProperty } from '../../utils/coerce/coerce-boolean';
import { DropdownComponent } from './dropdown.component';

@Directive({
  exportAs: 'ngxDropdownPortal',
  selector: 'ngx-dropdown[ngxDropdownPortal]',
  standalone: false
})
export class DropdownPortalDirective implements DoCheck, OnDestroy {
  @Input() portalOffsetX = 0;
  @Input() portalOffsetY = 0;
  @Input() portalPanelClass?: string | string[];

  /**
   * When true (default), the portaled menu tracks its trigger as scrollable
   * ancestors move. Set to false to leave the menu fixed in the viewport.
   */
  @Input() @CoerceBooleanProperty() portalFollowScroll = true;

  private overlayRef: OverlayRef | null = null;
  private detachmentsSub: Subscription | null = null;
  private scrollListenerCleanups: Array<() => void> = [];
  private wasOpen = false;
  private closingFromDetach = false;

  constructor(
    private readonly dropdown: DropdownComponent,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly overlay: Overlay,
    private readonly renderer: Renderer2,
    private readonly ngZone: NgZone
  ) {}

  ngDoCheck(): void {
    const isOpen = this.dropdown.open;

    if (isOpen && !this.wasOpen) {
      this.attach();
    } else if (!isOpen && this.wasOpen) {
      this.detach();
    }

    this.wasOpen = isOpen;
  }

  ngOnDestroy(): void {
    this.disposeOverlay();
  }

  private attach(): void {
    const menu = this.dropdown.dropdownMenu?.element;
    if (!menu || this.overlayRef?.hasAttached()) {
      return;
    }

    if (!this.overlayRef) {
      this.overlayRef = this.createOverlay(menu);
      this.detachmentsSub = this.overlayRef.detachments().subscribe(() => {
        this.unbindScrollListeners();
        if (this.dropdown.open) {
          this.closingFromDetach = true;
          this.dropdown.close();
          this.closingFromDetach = false;
        }
        this.wasOpen = false;
      });
    } else {
      this.overlayRef.updateScrollStrategy(this.createScrollStrategy());
    }

    this.overlayRef.updatePositionStrategy(this.createPositionStrategy(menu));
    this.overlayRef.attach(new DomPortal(menu));
    this.bindScrollListeners();
  }

  private detach(): void {
    this.unbindScrollListeners();

    if (this.closingFromDetach) {
      return;
    }

    if (this.overlayRef?.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  private disposeOverlay(): void {
    this.unbindScrollListeners();
    this.detachmentsSub?.unsubscribe();
    this.detachmentsSub = null;

    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  private createOverlay(menu: HTMLElement): OverlayRef {
    return this.overlay.create({
      positionStrategy: this.createPositionStrategy(menu),
      scrollStrategy: this.createScrollStrategy(),
      panelClass: this.getPanelClasses()
    });
  }

  private createScrollStrategy(): ScrollStrategy {
    if (!this.portalFollowScroll) {
      return this.overlay.scrollStrategies.noop();
    }

    // Window / cdkScrollable scrolls. Nested overflow ancestors are handled by
    // bindScrollListeners — CDK's ScrollDispatcher does not capture those.
    return this.overlay.scrollStrategies.reposition({ autoClose: false });
  }

  private createPositionStrategy(menu: HTMLElement) {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef.nativeElement)
      .withPush(true)
      .withFlexibleDimensions(false)
      .withPositions(this.getPositions(menu));
  }

  private bindScrollListeners(): void {
    this.unbindScrollListeners();

    this.ngZone.runOutsideAngular(() => {
      const onScroll = () => this.onScroll();

      for (const parent of this.getScrollParents(this.elementRef.nativeElement)) {
        this.scrollListenerCleanups.push(this.renderer.listen(parent, 'scroll', onScroll));
      }

      // Viewport / document scrolling (bubble phase only reaches window/document).
      this.scrollListenerCleanups.push(this.renderer.listen('window', 'scroll', onScroll));
    });
  }

  private onScroll(): void {
    if (!this.overlayRef?.hasAttached()) {
      return;
    }

    if (this.isOriginFullyHidden()) {
      this.ngZone.run(() => this.dropdown.close());
      return;
    }

    if (this.portalFollowScroll) {
      this.overlayRef.updatePosition();
    }
  }

  /**
   * True when the trigger is completely outside the viewport or any scrollable
   * ancestor (above/below/left/right of the fold).
   */
  private isOriginFullyHidden(): boolean {
    const origin = this.elementRef.nativeElement.getBoundingClientRect();
    const boundsList: Array<Pick<DOMRect, 'top' | 'right' | 'bottom' | 'left'>> = [
      {
        top: 0,
        left: 0,
        bottom: window.innerHeight,
        right: window.innerWidth
      },
      ...this.getScrollParents(this.elementRef.nativeElement).map(parent => parent.getBoundingClientRect())
    ];

    return boundsList.some(bounds => {
      const outsideAbove = origin.bottom < bounds.top;
      const outsideBelow = origin.top > bounds.bottom;
      const outsideLeft = origin.right < bounds.left;
      const outsideRight = origin.left > bounds.right;
      return outsideAbove || outsideBelow || outsideLeft || outsideRight;
    });
  }

  private unbindScrollListeners(): void {
    for (const cleanup of this.scrollListenerCleanups) {
      cleanup();
    }
    this.scrollListenerCleanups = [];
  }

  private getScrollParents(element: HTMLElement): HTMLElement[] {
    const parents: HTMLElement[] = [];
    let parent = element.parentElement;

    while (parent) {
      const style = getComputedStyle(parent);
      const overflow = `${style.overflow}${style.overflowY}${style.overflowX}`;

      if (/(auto|scroll|overlay)/.test(overflow)) {
        parents.push(parent);
      }

      parent = parent.parentElement;
    }

    return parents;
  }

  private getPositions(menu: HTMLElement): ConnectedPosition[] {
    const alignEnd = menu.classList.contains('align-right');
    const originX = alignEnd ? 'end' : 'start';
    const overlayX = alignEnd ? 'end' : 'start';
    const offsetX = this.portalOffsetX;
    const offsetY = this.portalOffsetY;

    return [
      {
        originX,
        originY: 'bottom',
        overlayX,
        overlayY: 'top',
        offsetX,
        offsetY
      },
      {
        originX,
        originY: 'top',
        overlayX,
        overlayY: 'bottom',
        offsetX,
        offsetY
      }
    ];
  }

  private getPanelClasses(): string[] {
    const classes = ['ngx-dropdown', 'open', 'adjusted', 'ngx-dropdown-portal-panel'];

    if (!this.portalPanelClass) {
      return classes;
    }

    return classes.concat(Array.isArray(this.portalPanelClass) ? this.portalPanelClass : [this.portalPanelClass]);
  }
}
