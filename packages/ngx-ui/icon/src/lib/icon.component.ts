import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';
import { IconRegistryService } from './icon-registry.service';

@Component({
  selector: 'ngx-icon[fontIcon], ngx-icon[svgSrc]',
  exportAs: 'ngxIcon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnChanges {
  @Input() fontIcon!: string | string[];
  @Input() alt = '';
  @Input() defaultPath = 'assets/svgs';
  @Input() fontSet = 'ngx';

  @Input()
  set svgSrc(val: string) {
    this.loadSvg(val);
  }

  cssClasses: string[] = [];

  constructor(
    private readonly http: HttpClient,
    private readonly elementRef: ElementRef,
    private readonly iconRegistryService: IconRegistryService
  ) {}

  ngOnChanges(): void {
    this.update();
  }

  update() {
    if (this.fontIcon) {
      this.cssClasses = this.iconRegistryService.get(
        this.fontIcon,
        this.fontSet
      );
    }
  }

  loadSvg(val: string): void {
    this.http
      .get(`${this.defaultPath}/${val}.svg`, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          // get our element and clean it out
          const element = this.elementRef.nativeElement;
          element.innerHTML = '';

          // get response and build svg element
          const parser = new DOMParser();
          const svg = parser.parseFromString(response, 'image/svg+xml');

          // insert the svg result
          element.innerHTML = svg.documentElement.outerHTML;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
