import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  HostBinding,
  HostListener,
  Inject,
  Input,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import {
  BooleanInput,
  DestroyedService,
  NgxBooleanInput,
} from '@swimlane/ngx-ui/common';
import { InViewportMetadata } from 'ng-in-viewport';
import { fromEvent, Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DropdownMenuDirective, DropdownToggleDirective } from './directives';

@Component({
  selector: 'ngx-dropdown',
  template: ` <ng-content></ng-content>`,
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyedService],
})
export class DropdownComponent implements AfterContentInit {
  static ngAcceptInputType_open: BooleanInput;
  static ngAcceptInputType_showCaret: BooleanInput;
  static ngAcceptInputType_closeOnClick: BooleanInput;
  static ngAcceptInputType_closeOnOutsideClick: BooleanInput;
  static ngAcceptInputType_closeOnMouseLeave: BooleanInput;

  @HostBinding('class.ngx-dropdown') hostClass = true;

  @NgxBooleanInput()
  @Input()
  open = false;

  @NgxBooleanInput()
  @Input()
  showCaret = false;

  @NgxBooleanInput()
  @Input()
  closeOnClick = true;

  @NgxBooleanInput()
  @Input()
  closeOnOutsideClick = true;

  @NgxBooleanInput()
  @Input()
  closeOnMouseLeave = true;

  @ContentChild(DropdownToggleDirective)
  readonly dropdownToggle?: DropdownToggleDirective;

  @ContentChild(DropdownMenuDirective)
  readonly dropdownMenu?: DropdownMenuDirective;

  private _positionAdjusted = false;
  public get positionAdjusted() {
    return this._positionAdjusted;
  }

  private mouseLeaveTimerSubscription?: Subscription;
  private documentClickSubscription?: Subscription;

  constructor(
    private readonly destroyed: DestroyedService,
    private readonly renderer: Renderer2,
    private readonly cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  ngAfterContentInit(): void {
    if (this.dropdownToggle) {
      this.dropdownToggle.toggle
        .pipe(takeUntil(this.destroyed))
        .subscribe(() => this.onToggleClick());
    }

    if (this.dropdownMenu) {
      this.dropdownMenu.options = { partial: false };
      this.dropdownMenu
        .getCallbackFn()
        .pipe(takeUntil(this.destroyed))
        .subscribe({ next: this.adjustMenuDirection.bind(this) });
    }
  }

  adjustMenuDirection(event: {
    [InViewportMetadata]: { entry: IntersectionObserverEntry };
    target: HTMLElement;
    visible: boolean;
  }): void {
    if (!event.visible && this.open) {
      if (this.dropdownMenu) {
        if (this.isIntersectingBottom(event[InViewportMetadata].entry)) {
          this.renderer.addClass(
            this.dropdownMenu.element,
            'ngx-dropdown-menu--upwards'
          );
        } else {
          this.renderer.removeClass(
            this.dropdownMenu.element,
            'ngx-dropdown-menu--upwards'
          );
        }
      }
    }
    if (this.open) {
      this._positionAdjusted = true;
      this.cdr.markForCheck();
    }
  }

  isIntersectingBottom(entry: IntersectionObserverEntry): boolean {
    return entry.boundingClientRect.bottom >= (entry.rootBounds?.bottom || 0);
  }

  onDocumentClick(e: MouseEvent): void {
    if (
      this.open &&
      this.closeOnOutsideClick &&
      this.dropdownToggle &&
      this.dropdownMenu
    ) {
      const isToggling = this.dropdownToggle.element.contains(e.target as Node);
      const isMenuClick =
        !this.closeOnClick &&
        this.dropdownMenu.element.contains(e.target as Node);

      if (!isToggling && !isMenuClick) {
        this.close();
      }
    }
  }

  onToggleClick(): void {
    this.open = !this.open;

    if (this.open) {
      this.documentClickSubscription = fromEvent<MouseEvent>(
        this.document,
        'click'
      )
        .pipe(takeUntil(this.destroyed))
        .subscribe((event: MouseEvent) => {
          this.onDocumentClick(event);
        });
    } else {
      if (this.documentClickSubscription) {
        this.documentClickSubscription.unsubscribe();
      }
      this._positionAdjusted = false;
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.closeOnMouseLeave) {
      this.mouseLeaveTimerSubscription = timer(1000).subscribe(() => {
        this.close();
      });
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.mouseLeaveTimerSubscription) {
      this.mouseLeaveTimerSubscription.unsubscribe();
    }
  }

  private close() {
    if (this.dropdownMenu) {
      this.renderer.removeClass(
        this.dropdownMenu.element,
        'ngx-dropdown-menu--upwards'
      );
    }
    this.open = false;
    this._positionAdjusted = false;
    if (this.documentClickSubscription)
      this.documentClickSubscription.unsubscribe();
    this.cdr.markForCheck();
  }
}
