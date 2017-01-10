import { Component, HostBinding, Input, ChangeDetectionStrategy, ElementRef, Renderer } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'ngx-icon',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {

  @Input() fontIcon: string;
  @Input() alt: string;
  @Input() defaultPath: string = 'assets/svg';

  @Input()
  set svgSrc(val: string) {
    this.loadSvg(val);
  }

  @HostBinding('class')
  get cssClass(): string {
    if(this.fontIcon) return `ngx-icon icon-${this.fontIcon}`;
    return `ngx-icon icon-svg`;
  }

  constructor(
    private http: Http,
    private renderer: Renderer,
    private elementRef: ElementRef) { }

  loadSvg(val: string): void {
    this.http.get(`${this.defaultPath}/${val}.svg`)
      .subscribe(
        res => {
          // get our element and clean it out
          const element = this.elementRef.nativeElement;
          element.innerHTML = '';

          // get response and build svg element
          const response = res.text();
          const parser = new DOMParser();
          const svg = parser.parseFromString(response, 'image/svg+xml');

          // insert the svg result
          this.renderer.projectNodes(element, [svg.documentElement]);
        },
        err => console.error(err));
  }

}
