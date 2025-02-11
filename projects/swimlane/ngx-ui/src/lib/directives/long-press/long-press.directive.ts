import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  selector: '[long-press]',
  standalone: false
})
export class LongPressDirective {
  @Input()
  get duration(): number {
    return this._duration;
  }
  set duration(duration: number) {
    this._duration = coerceNumberProperty(duration, 3000);
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  @Output() longPressStart = new EventEmitter<boolean>();
  @Output() longPressFinish = new EventEmitter<boolean>();
  @Output() longPressCancel = new EventEmitter<boolean>();

  private _duration = 3000;
  private _disabled = false;
  private _pressed = false;
  private _pressTimeout: any;

  @HostListener('mousedown', ['$event'])
  onPress(event: MouseEvent): void {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }

    this._pressed = true;
    this.longPressStart.emit(true);
    this._pressTimeout = setTimeout(() => {
      /* istanbul ignore else */
      if (this._pressed) {
        this._pressed = false;
        this.longPressFinish.emit(true);
      }
    }, this.duration);
  }

  @HostListener('mouseout')
  @HostListener('mouseup')
  onRelease(): void {
    this._pressed = false;
    clearTimeout(this._pressTimeout);
    this.longPressCancel.emit(true);
  }
}
