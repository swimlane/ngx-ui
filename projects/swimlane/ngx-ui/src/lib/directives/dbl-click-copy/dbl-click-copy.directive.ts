import { Directive, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[dbl-click-copy]',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    title: 'Double click to copy to clipboard'
  },
  standalone: false
})
export class DblClickCopyDirective {
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
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
