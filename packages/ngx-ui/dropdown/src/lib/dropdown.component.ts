import type { BooleanInput } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  HostBinding,
  HostListener,
  Inject,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { DestroyedService } from '@swimlane/ngx-ui/destroyed';
import { Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DropdownMenuDirective, DropdownToggleDirective } from './directives';

/** @dynamic */
@Component({
  selector: 'ngx-dropdown',
  exportAs: 'ngxDropdown',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyedService]
})
export class DropdownComponent implements AfterContentInit {
  static ngAcceptInputType_open: BooleanInput;
  static ngAcceptInputType_showCaret: BooleanInput;
  static ngAcceptInputType_closeOnClick: BooleanInput;
  static ngAcceptInputType_closeOnOutsideClick: BooleanInput;
  static ngAcceptInputType_closeOnMouseLeave: BooleanInput;

  @HostBinding('class.open')
  @InputBoolean()
  @Input()
  open = false;

  @HostBinding('class.has-caret')
  @InputBoolean()
  @Input()
  showCaret = false;

  @InputBoolean()
  @Input()
  closeOnClick = true;

  @InputBoolean()
  @Input()
  closeOnOutsideClick = true;

  @InputBoolean()
  @Input()
  closeOnMouseLeave = false;

  @ContentChild(DropdownToggleDirective)
  readonly dropdownToggle?: DropdownToggleDirective;
  @ContentChild(DropdownMenuDirective)
  readonly dropdownMenu!: DropdownMenuDirective;

  @HostBinding('class.ngx-dropdown') hostClass = true;

  private mouseLeaveTimerSubscription?: Subscription;

  constructor(private readonly destroyed: DestroyedService, @Inject(DOCUMENT) private readonly document: Document) {}

  ngAfterContentInit() {
    if (this.dropdownToggle) {
      this.dropdownToggle.toggle.pipe(takeUntil(this.destroyed)).subscribe(() => (this.open = !this.open));
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.open && this.closeOnOutsideClick) {
      const isToggling = this.dropdownToggle?.element.contains(event.target as Node);
      const isMenuClick = !this.closeOnClick && this.dropdownMenu.element.contains(event.target as Node);

      if (!isToggling && !isMenuClick) {
        this.close();
      }
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    if (this.closeOnMouseLeave) {
      this.unsubscribeMouseLeave();
      this.mouseLeaveTimerSubscription = timer(1000).subscribe(() => this.close());
    }
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.unsubscribeMouseLeave();
  }

  private unsubscribeMouseLeave() {
    if (this.mouseLeaveTimerSubscription) {
      this.mouseLeaveTimerSubscription.unsubscribe();
    }
  }

  private close() {
    this.open = false;
  }
}
