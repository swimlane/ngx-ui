import { Clipboard } from '@angular/cdk/clipboard';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[ngxCopyToClipboard]',
  exportAs: 'ngxCopyToClipboard',
})
export class CopyToClipboardDirective {
  @Input() ngxCopyToClipboard: 'clk' | 'dblclk' = 'clk';
  @Input() ngxCopyToClipboardText?: string;
  @Output() copied = new EventEmitter<string>();

  @HostBinding('attr.title') get hostTitle() {
    const clickType =
      this.ngxCopyToClipboard === 'clk' ? 'Click' : 'Double click';
    return `${clickType} to copy to clipboard`;
  }

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly clipboard: Clipboard
  ) {}

  @HostListener('click')
  click() {
    if (this.ngxCopyToClipboard === 'clk') {
      this.copy();
    }
  }

  @HostListener('dblclick')
  dblClick() {
    if (this.ngxCopyToClipboard === 'dblclk') {
      this.copy();
    }
  }

  private copy() {
    const text = this.ngxCopyToClipboardText || this.el.nativeElement.innerText;
    if (this.clipboard.copy(text)) {
      this.copied.next(text);
    }
  }
}
