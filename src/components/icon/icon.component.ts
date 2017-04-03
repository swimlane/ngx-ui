import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ElementRef,
    Renderer,
    OnChanges,
    ContentChild,
    OnInit
  } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IconRegisteryService } from '../../services/icon-registery.service';

@Component({
  selector: 'ngx-icon',
  template: `
    <ng-container [ngSwitch]="cssClasses?.length">
      <ng-content *ngSwitchCase=""></ng-content>
      <ng-content *ngSwitchCase="0"></ng-content>
      <i *ngSwitchCase="1" [ngClass]="cssClasses[0]"></i>
      <span *ngSwitchDefault class="icon-fx-stacked">
        <i *ngFor="let cssClass of cssClasses" [ngClass]="cssClass"></i>
      </span>
    </ng-container>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnChanges, OnInit {

  @Input() fontIcon: string | string[];
  @Input() alt: string;
  @Input() defaultPath: string = 'assets/svg';
  @Input() fontSet: string = 'icon';

  @Input()
  set svgSrc(val: string) {
    this.loadSvg(val);
  }

  cssClasses: string[];

  constructor(
    private http: Http,
    private renderer: Renderer,
    private elementRef: ElementRef,
    private iconRegisteryService: IconRegisteryService) { }

  ngOnChanges(changes: any) {
    const icon = (this.fontIcon.includes('::')) ? this.fontIcon : `${this.fontSet}::${this.fontIcon}`;
    this.cssClasses = this.iconRegisteryService.get(icon);
  }

  ngOnInit() {
    const icon = (this.fontIcon.includes('::')) ? this.fontIcon : `${this.fontSet}::${this.fontIcon}`;
    this.cssClasses = this.iconRegisteryService.get(icon);
  }

  /* getFontClasses(input: any): any[] {
    input = input || 'svg';
    input = this.iconRegisteryService.get(input);
    return input.map(c => this.convertClass(c));
  }

  convertClass(inputClass: string): string {
    const classes = inputClass ?
      inputClass.split(' ').map(d => `${this.fontSet}-${d}`) :
      [`${this.fontSet}-svg`];
    classes.unshift('ngx-icon');
    return classes.join(' ');
  }

  getFontClasses(input) {
    input = this.iconRegisteryService.get(input);
    if (Array.isArray(input)) {
      return [].concat(input.map(d => this.getFontClasses(d)));
    }

    input = input || 'svg';

    if (typeof input === 'string') {
      return [this.convertClass(input.trim())];
    }
    return [];
  } */

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
