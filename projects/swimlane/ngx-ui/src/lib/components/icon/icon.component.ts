import {
  Component,
  Input,
  ChangeDetectionStrategy,
  NgZone,
  ElementRef,
  OnChanges,
  OnInit,
  ViewEncapsulation,
  OnDestroy
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { IconRegistryService } from '../../services/icon-registry/icon-registry.service';

@Component({
  exportAs: 'ngxIcon',
  selector: 'ngx-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnChanges, OnInit, OnDestroy {
  @Input() fontIcon: string | string[];
  @Input() alt: string;
  @Input() defaultPath: string = 'assets/svgs';
  @Input() fontSet: string = 'ngx';

  @Input()
  set svgSrc(val: string) {
    this.loadSvg(val);
  }

  cssClasses: string[];

  private subscription: Subscription | null = null;

  constructor(
    private ngZone: NgZone,
    private http: HttpClient,
    private host: ElementRef<HTMLElement>,
    private iconRegisteryService: IconRegistryService
  ) {}

  ngOnChanges() {
    this.update();
  }

  ngOnInit() {
    this.update();
  }

  ngOnDestroy(): void {
    this.dispose();
  }

  update() {
    if (this.fontIcon) {
      this.cssClasses = this.iconRegisteryService.get(this.fontIcon, this.fontSet);
    }
  }

  loadSvg(val: string): void {
    this.dispose();

    this.ngZone.runOutsideAngular(() => {
      this.subscription = this.http.get(`${this.defaultPath}/${val}.svg`, { responseType: 'text' }).subscribe(
        /* istanbul ignore next */
        (response: string) => {
          // get our element and clean it out
          const element = this.host.nativeElement;
          element.innerHTML = '';

          // get response and build svg element
          const parser = new DOMParser();
          const svg = parser.parseFromString(response, 'image/svg+xml');

          // insert the svg result
          // tslint:disable-next-line: tsr-detect-html-injection
          element.innerHTML = svg.documentElement.outerHTML;
        },
        /* istanbul ignore next */
        err => {
          console.error(err);
        }
      );
    });
  }

  private dispose(): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
