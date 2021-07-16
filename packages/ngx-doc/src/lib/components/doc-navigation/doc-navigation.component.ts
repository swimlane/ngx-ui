import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  BooleanInput,
  DestroyedService,
  NgxBooleanInput,
} from '@swimlane/ngx-ui/common';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  filter,
  map,
  mergeMap,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { DocMenuItem } from '../../models';
import { NGX_DOC_TITLE, NGX_DOC_TITLE_PREFIX } from '../../tokens';
import { isPresent } from '../../utils';

export function docTitleFactory(
  router: Router,
  route: ActivatedRoute,
  titlePrefix: string,
  destroyed: DestroyedService
) {
  return router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    map(() => route.firstChild),
    filter(isPresent),
    mergeMap((activatedRoute) => activatedRoute.data),
    map(({ title }) => titlePrefix + title),
    takeUntil(destroyed)
  );
}

@Component({
  selector: 'ngx-doc-navigation',
  templateUrl: './doc-navigation.component.html',
  styleUrls: ['./doc-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DestroyedService,
    {
      provide: NGX_DOC_TITLE,
      deps: [Router, ActivatedRoute, NGX_DOC_TITLE_PREFIX, DestroyedService],
      useFactory: docTitleFactory,
    },
  ],
})
export class DocNavigationComponent implements OnInit {
  static ngAcceptInputType_search: BooleanInput;
  static ngAcceptInputType_logo: BooleanInput;
  static ngAcceptInputType_navigationExpanded: BooleanInput;
  static ngAcceptInputType_hasLogoCollapsed: BooleanInput;

  @HostBinding('class.ngx-doc-navigation') hostClass = true;

  @Input()
  navigationItems: DocMenuItem[] = [];

  @NgxBooleanInput()
  @Input()
  search = true;

  @NgxBooleanInput()
  @Input()
  logo = true;

  @NgxBooleanInput()
  @Input()
  navigationExpanded = true;

  @NgxBooleanInput()
  @Input()
  hasLogoCollapsed = false;

  @Output() navigationExpandedChange = new EventEmitter<boolean>();

  queryControl = new FormControl('');

  filteredNavigationItems$?: Observable<DocMenuItem[]>;

  constructor(
    private readonly destroyed: DestroyedService,
    private readonly titleService: Title,
    private readonly route: ActivatedRoute,
    @Inject(NGX_DOC_TITLE) private readonly docTitle: Observable<string>,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    docTitle.subscribe((title) => {
      titleService.setTitle(title);
      this.navigateToAnchorLink(this.route.snapshot.fragment);
    });
  }

  ngOnInit() {
    this.filteredNavigationItems$ = this.queryControl.valueChanges.pipe(
      debounceTime(250),
      switchMap((query) => {
        const trimmedLowercaseQuery = query.trim().toLowerCase();
        if (trimmedLowercaseQuery) {
          return of(
            [...this.navigationItems].reduce((filtered, item) => {
              const queueItem: DocMenuItem = { ...item, children: [] };

              if (item.children?.length) {
                queueItem.children = item.children.filter((child) =>
                  child.name.toLowerCase().includes(trimmedLowercaseQuery)
                );

                filtered.push(queueItem);
              } else if (
                queueItem.name.toLowerCase().includes(trimmedLowercaseQuery)
              ) {
                filtered.push(queueItem);
              }

              return filtered;
            }, [] as DocMenuItem[])
          );
        }

        return of(this.navigationItems);
      }),
      startWith(this.navigationItems),
      takeUntil(this.destroyed)
    );
  }

  trackByItemName(_: number, item: DocMenuItem) {
    return item.name;
  }

  private navigateToAnchorLink(fragment: string | null) {
    const element = fragment && this.document.querySelector(`#${fragment}`);

    if (!element) {
      return;
    }

    element.scrollIntoView({
      block: 'start',
      inline: 'nearest',
      behavior: 'smooth',
    });
  }
}
