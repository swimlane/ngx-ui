/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable security/detect-object-injection */
import {
  AfterContentChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Optional,
  Renderer2
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { filter, take } from 'rxjs/operators';

@Directive({
  selector: '[autoSizeInput]',
  standalone: false
})
export class AutoSizeInputDirective implements AfterContentChecked, AfterViewInit {
  @Input() extraWidth = 0;
  @Input() includeBorders = false;
  @Input() includePadding = true;
  @Input() includePlaceholder = true;
  @Input() maxWidth = -1;
  @Input() minWidth = -1;
  @Input() setParentWidth = false;

  constructor(private element: ElementRef, @Optional() private ngModel: NgModel, private renderer: Renderer2) {}

  get borderWidth(): number {
    return this.includeBorders ? 2 * this._getPropertyWidth('border') : 0;
  }

  get paddingWidth(): number {
    return this.includePadding ? this._getPropertyWidth('padding-left') + this._getPropertyWidth('padding-right') : 0;
  }

  ngAfterContentChecked(): void {
    this.updateWidth();
  }

  ngAfterViewInit(): void {
    if (this.ngModel) {
      this.ngModel.valueChanges
        .pipe(
          filter(val => !!val),
          take(1)
        )
        .subscribe(() => this.updateWidth());
    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  @HostListener('input')
  onInput(): void {
    this.updateWidth();
  }

  setWidth(width: number): void {
    const element = this.element.nativeElement;
    const parent = this.renderer.parentNode(element);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.setParentWidth
      ? this.renderer.setStyle(parent, 'width', width + 'px')
      : this.renderer.setStyle(element, 'width', width + 'px');
  }

  setWidthUsingText(text: string): void {
    this.setWidth(this.textWidth(text) + this.extraWidth + this.borderWidth + this.paddingWidth);
  }

  textWidth(value: string): number {
    const ctx = this.renderer.createElement('canvas').getContext('2d');
    const style = window.getComputedStyle(this.element.nativeElement, '');
    const fontStyle = style.getPropertyValue('font-style');
    const fontVariant = style.getPropertyValue('font-variant');
    const fontWeight = style.getPropertyValue('font-weight');
    const fontSize = style.getPropertyValue('font-size');
    const fontFamily = style.getPropertyValue('font-family');

    // font string format: {normal, normal, 700, 20px, Roboto, "Helvetica Neue", sans-serif}
    ctx.font = fontStyle + ' ' + fontVariant + ' ' + fontWeight + ' ' + fontSize + ' ' + fontFamily;

    return ctx!.measureText(value).width;
  }

  updateWidth(): void {
    const inputText = this.ngModel ? this.ngModel.value : this._getProperty('value');
    const placeHolderText = this._getProperty('placeholder');
    const inputTextWidth = this.textWidth(inputText) + this.extraWidth + this.borderWidth + this.paddingWidth;
    const setMinWidth = this.minWidth > 0 && this.minWidth > inputTextWidth;
    const setPlaceHolderWidth =
      this.includePlaceholder &&
      placeHolderText.length > 0 &&
      this.textWidth(placeHolderText) > this.textWidth(inputText);
    const setMaxWidth = this.maxWidth > 0 && this.maxWidth < inputTextWidth;

    if (setMinWidth) {
      this.setWidth(this.minWidth);
    } else if (setPlaceHolderWidth) {
      this.setWidthUsingText(placeHolderText);
    } else if (setMaxWidth) {
      this.setWidth(this.maxWidth);
    } else {
      this.setWidthUsingText(inputText);
    }
  }

  private _getProperty(property: 'value' | 'placeholder') {
    try {
      return this.element.nativeElement[property];
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      return '';
    }
  }

  private _getPropertyWidth(property: string): number {
    const width = window.getComputedStyle(this.element.nativeElement, '').getPropertyValue(property);
    return parseInt(width, 10);
  }
}
