import { ComponentRef, Injectable } from '@angular/core';
import { InjectionService } from '@swimlane/ngx-ui/common';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OverlayComponent } from '../overlay.component';

@Injectable({ providedIn: 'root' })
export class OverlayService {
  component?: ComponentRef<OverlayComponent>;

  // list of components that will close by clicking the overlay
  triggerComponents: {
    component: ComponentRef<unknown>;
    zIndex: number;
  }[] = [];

  private readonly $click = new Subject<ComponentRef<unknown>>();
  readonly click$ = this.$click.asObservable();

  get instance() {
    if (this.component) return this.component.instance;
    return undefined;
  }

  constructor(private readonly injectionService: InjectionService) {}

  show(options: { triggerComponent: ComponentRef<unknown>; zIndex: number }) {
    if (!options.triggerComponent) {
      throw new Error('ngx-ui OverlayService.show: triggerComponent missing ');
    }
    if (!this.component) {
      this.component = this.injectComponent();
      if (this.instance) {
        this.instance.overlayClick
          .pipe(takeUntil(this.instance.destroyed))
          .subscribe(this.onClick.bind(this));
      }
    }

    this.triggerComponents.push({
      component: options.triggerComponent,
      zIndex: options.zIndex,
    });

    this.component.instance.visible = true;
    this.updateZIndex();

    return this.component;
  }

  hide() {
    if (this.triggerComponents.length === 0 && this.component) {
      this.component.instance.visible = false;
    }
  }

  destroy() {
    if (this.component) {
      // destroy is called like this to trigger
      // proper lifecycle events like animations
      this.hide();

      timer(100).subscribe(() => {
        // <--- new dialog is being created during this timeout.
        if (this.component && this.triggerComponents.length === 0) {
          this.component.destroy();
          this.component = undefined;
        }
      });
    }
  }

  injectComponent(): ComponentRef<OverlayComponent> {
    return this.injectionService.appendComponent(OverlayComponent);
  }

  onClick() {
    if (this.triggerComponents.length > 0) {
      const lastIdx = this.triggerComponents.length - 1;
      const triggerComponent = this.triggerComponents[lastIdx];
      this.$click.next(triggerComponent.component);
    }
  }

  removeTriggerComponent(component: ComponentRef<unknown>) {
    const idx = this.triggerComponents.findIndex(
      (c) => c.component === component
    );
    if (idx !== -1) {
      this.triggerComponents.splice(idx, 1);
    }

    this.updateZIndex();

    if (this.triggerComponents.length === 0) {
      this.destroy();
    }
  }

  updateZIndex() {
    if (this.triggerComponents.length === 0) {
      return;
    }
    const indexes = this.triggerComponents.map((tc) => tc.zIndex);
    const zIndex = Math.max(...indexes) - 1;
    if (this.instance) {
      this.instance.zIndex = zIndex;
    }
  }
}
