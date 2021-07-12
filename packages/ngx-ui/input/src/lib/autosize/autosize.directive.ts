import {
  AfterContentChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Optional,
  Renderer2,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import {
  BooleanInput,
  NgxBooleanInput,
  NgxNumericInput,
  NumericInput,
} from '@swimlane/ngx-ui/common';
import { filter, take } from 'rxjs/operators';

@Directive({
  selector: '[ngxAutosizeInput]',
})
export class AutosizeInputDirective
  implements AfterContentChecked, AfterViewInit
{
  static ngAcceptInputType_extraWidth: NumericInput;
  static ngAcceptInputType_maxWidth: NumericInput;
  static ngAcceptInputType_minWidth: NumericInput;
  static ngAcceptInputType_includeBorders: BooleanInput;
  static ngAcceptInputType_includePadding: BooleanInput;
  static ngAcceptInputType_includePlaceholder: BooleanInput;
  static ngAcceptInputType_setParentWidth: BooleanInput;

  @NgxNumericInput(0)
  @Input()
  extraWidth = 0;

  @NgxBooleanInput()
  @Input()
  includeBorders = false;

  @NgxBooleanInput()
  @Input()
  includePadding = true;

  @NgxBooleanInput()
  @Input()
  includePlaceholder = true;

  @NgxNumericInput(-1)
  @Input()
  maxWidth = -1;

  @NgxNumericInput(-1)
  @Input()
  minWidth = -1;

  @NgxBooleanInput()
  @Input()
  setParentWidth = false;

  constructor(
    private readonly element: ElementRef,
    private readonly renderer: Renderer2,
    @Optional() private readonly ngModel?: NgModel
  ) {}

  get borderWidth(): number {
    return this.includeBorders ? 2 * this._getPropertyWidth('border') : 0;
  }

  get paddingWidth(): number {
    return this.includePadding
      ? this._getPropertyWidth('padding-left') +
          this._getPropertyWidth('padding-right')
      : 0;
  }

  ngAfterContentChecked() {
    this.updateWidth();
  }

  ngAfterViewInit() {
    if (this.ngModel && this.ngModel.valueChanges) {
      this.ngModel.valueChanges
        .pipe(
          filter((val) => !!val),
          take(1)
        )
        .subscribe(() => this.updateWidth());
    }
  }

  @HostListener('input')
  public onInput(): void {
    this.updateWidth();
  }

  setWidth(width: number): void {
    const element = this.element.nativeElement;
    const parent = this.renderer.parentNode(element);
    this.setParentWidth
      ? this.renderer.setStyle(parent, 'width', width + 'px')
      : this.renderer.setStyle(element, 'width', width + 'px');
  }

  setWidthUsingText(text: string): void {
    this.setWidth(
      this.textWidth(text) +
        this.extraWidth +
        this.borderWidth +
        this.paddingWidth
    );
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
    ctx.font =
      fontStyle +
      ' ' +
      fontVariant +
      ' ' +
      fontWeight +
      ' ' +
      fontSize +
      ' ' +
      fontFamily;

    return ctx?.measureText(value).width;
  }

  updateWidth(): void {
    const inputText = this.ngModel
      ? this.ngModel.value
      : this._getProperty('value');
    const placeHolderText = this._getProperty('placeholder');
    const inputTextWidth =
      this.textWidth(inputText) +
      this.extraWidth +
      this.borderWidth +
      this.paddingWidth;
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
    } catch (error) {
      return '';
    }
  }

  private _getPropertyWidth(property: string): number {
    const width = window
      .getComputedStyle(this.element.nativeElement, '')
      .getPropertyValue(property);
    return parseInt(width, 10);
  }
}
