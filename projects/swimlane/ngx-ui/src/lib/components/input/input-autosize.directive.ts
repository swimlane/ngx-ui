import { ElementRef, HostListener, Directive, AfterContentChecked, Renderer } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'textarea[autosize]'
})
export class AutosizeDirective implements AfterContentChecked {
  constructor(public element: ElementRef, private renderer: Renderer) {}

  ngAfterContentChecked(): void {
    this.adjust();
  }

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  adjust(): void {
    const height = this.element.nativeElement.scrollHeight + 'px';
    this.renderer.setElementStyle(this.element.nativeElement, 'overflow', 'hidden');
    this.renderer.setElementStyle(this.element.nativeElement, 'height', height);
  }
}
