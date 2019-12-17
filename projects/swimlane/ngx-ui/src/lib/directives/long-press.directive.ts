import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({
  selector: '[long-press]'
})
export class LongPressDirective {
  @Input() duration: number = 3000;
  @Input() disabled: boolean = false;

  @Output() longPressStart: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() longPressFinish: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() longPressCancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  private pressed: boolean = false;
  private pressTimeout: any;

  @HostListener('mousedown', ['$event'])
  onPress(event: MouseEvent): void {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }
    this.pressed = true;
    this.longPressStart.emit(true);
    this.pressTimeout = setTimeout(() => {
      if (this.pressed) {
        this.pressed = false;
        this.longPressFinish.emit(true);
      }
    }, this.duration);
  }

  @HostListener('mouseout')
  @HostListener('mouseup')
  onRelease(): void {
    this.pressed = false;
    clearTimeout(this.pressTimeout);
    this.longPressCancel.emit(true);
  }
}
