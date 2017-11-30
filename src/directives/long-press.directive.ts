import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener
} from '@angular/core';

@Directive({ selector: '[long-press]' })
export class LongPressDirective {
  @Input() duration: number = 3000;
  @Input() disabled: boolean = false;
  @Output() longPressStart: EventEmitter<any> = new EventEmitter<any>();
  @Output() longPressFinish: EventEmitter<any> = new EventEmitter<any>();
  @Output() longPressCancel: EventEmitter<any> = new EventEmitter<any>();
  pressed: boolean = false;
  pressTimeout: any;

  @HostListener('mousedown', ['$event'])
  onPress(event): void {
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

  @HostListener('mouseout', ['$event'])
  @HostListener('mouseup', ['$event'])
  onRelease(event): void {
    this.pressed = false;
    clearTimeout(this.pressTimeout);
    this.longPressCancel.emit(true);
  }

}
