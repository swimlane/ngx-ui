import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  BooleanInput,
  DestroyedService,
  NgxBooleanInput,
} from '@swimlane/ngx-ui/common';
import { Observable, of } from 'rxjs';
import { debounceTime, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { DocMenuItem } from '../../models';

@Component({
  selector: 'ngx-doc-navigation',
  templateUrl: './doc-navigation.component.html',
  styleUrls: ['./doc-navigation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyedService],
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

  constructor(private readonly destroyed: DestroyedService) {}

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
}
