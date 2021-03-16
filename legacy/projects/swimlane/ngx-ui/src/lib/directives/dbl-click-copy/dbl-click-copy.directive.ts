import { Directive, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({
  selector: '[dbl-click-copy]',
  host: {
    title: 'Double click to copy to clipboard'
  }
})
export class DblClickCopyDirective {
  @Output() onCopy = new EventEmitter<Range>();

  constructor(private readonly element: ElementRef<HTMLElement>) {}

  @HostListener('dblclick')
  onDblClick(): void {
    const selection = getSelection();
    const range = document.createRange();

    range.selectNodeContents(this.element.nativeElement);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');

    this.onCopy.emit(range);
  }
}
