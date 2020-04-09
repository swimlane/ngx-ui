import { ElementRef, HostListener, Directive, AfterContentChecked, Renderer2 } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  exportAs: 'ngxAutosize',
  selector: 'textarea[autosize]'
})
export class AutosizeDirective implements AfterContentChecked {
  constructor(public element: ElementRef, private renderer: Renderer2) {}

  ngAfterContentChecked(): void {
    this.adjust();
  }

  @HostListener('input', ['$event.target'])
  onInput(_?: HTMLTextAreaElement): void {
    this.adjust();
  }

  adjust(): void {
    const height = this.element.nativeElement.scrollHeight + 'px';
    this.renderer.setStyle(this.element.nativeElement, 'overflow', 'hidden');
    this.renderer.setStyle(this.element.nativeElement, 'height', height);
  }
}
