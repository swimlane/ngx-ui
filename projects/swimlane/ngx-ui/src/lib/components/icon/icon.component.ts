import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation
} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IconRegistryService } from '../../services/icon-registry/icon-registry.service';
import { isPlatformServer } from '@angular/common';

@Component({
  exportAs: 'ngxIcon',
  selector: 'ngx-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnChanges, OnInit {
  @Input() fontIcon: string | string[];
  @Input() alt: string;
  @Input() defaultPath = 'assets/svgs';
  @Input() fontSet = 'ngx';

  @Input()
  set svgSrc(val: string) {
    this.loadSvg(val);
  }

  cssClasses: string[];

  constructor(
    private http: HttpClient,
    private elementRef: ElementRef,
    private iconRegisteryService: IconRegistryService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnChanges() {
    this.update();
  }

  ngOnInit() {
    this.update();
  }

  update() {
    if (this.fontIcon) {
      this.cssClasses = this.iconRegisteryService.get(this.fontIcon, this.fontSet);
    }
  }

  loadSvg(val: string): void {
    if (isPlatformServer(this.platformId)) return;
    const opts: any = { responseType: 'text' };
    this.http.get<string>(`${this.defaultPath}/${val}.svg`, opts).subscribe(
      /* istanbul ignore next */
      (response: any) => {
        // get our element and clean it out
        const element = this.elementRef.nativeElement;
        element.innerHTML = '';

        // get response and build svg element
        const parser = new DOMParser();
        const svg = parser.parseFromString(response, 'image/svg+xml');

        // insert the svg result
        // eslint-disable-next-line
        element.innerHTML = svg.documentElement.outerHTML;
      },
      /* istanbul ignore next */
      err => {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    );
  }
}
