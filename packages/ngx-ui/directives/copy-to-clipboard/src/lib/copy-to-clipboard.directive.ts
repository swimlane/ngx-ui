import { Clipboard } from '@angular/cdk/clipboard';
import { Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[copyToClipboard]'
})
export class CopyToClipboardDirective {
  @Input() copyToClipboard!: 'clk' | 'dblclk';
  @Input() copyToClipboardText?: string;
  @Output() copied = new EventEmitter<string>();

  @HostBinding('attr.title') get hostTitle() {
    const clickType = this.copyToClipboard === 'clk' ? 'Click' : 'Double click';
    return `${clickType} to copy to clipboard`;
  }

  constructor(private readonly el: ElementRef<HTMLElement>, private readonly clipboard: Clipboard) {}

  @HostListener('click')
  click() {
    if (this.copyToClipboard === 'clk') {
      this.copy();
    }
  }

  @HostListener('dblclick')
  dblClick() {
    if (this.copyToClipboard === 'dblclk') {
      this.copy();
    }
  }

  private copy() {
    const text = this.copyToClipboardText || this.el.nativeElement.innerText;
    if (this.clipboard.copy(text)) {
      this.copied.next(text);
    }
  }
}
