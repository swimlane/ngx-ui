import { ElementRef, HostListener, Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  exportAs: 'ngxAutosize',
  selector: 'textarea[autosize]'
})
export class AutosizeDirective {
  constructor(readonly element: ElementRef<HTMLElement>) {}

  @HostListener('input', ['$event.target'])
  onInput(_?: HTMLTextAreaElement): void {
    const height = this.element.nativeElement.scrollHeight + 'px';
    this.element.nativeElement.style.height = height;
  }
}
