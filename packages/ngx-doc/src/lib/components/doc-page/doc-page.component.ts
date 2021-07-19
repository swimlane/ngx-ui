import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  HostBinding,
  Inject,
  Input,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanInput, NgxBooleanInput } from '@swimlane/ngx-ui/common';
import { NGX_DOC_DEFAULT_PAGE_TABS } from '../../tokens';
import { DocPageTabDirective } from './doc-page-tab.directive';

@Component({
  selector: 'ngx-doc-page[header]',
  templateUrl: './doc-page.component.html',
  styleUrls: ['./doc-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocPageComponent {
  static ngAcceptInputType_deprecated: BooleanInput;

  @HostBinding('class.ngx-doc-page') hostClass = true;

  @Input() header = '';

  @NgxBooleanInput()
  @Input()
  deprecated = false;

  @ContentChildren(DocPageTabDirective)
  readonly tabConnectors: QueryList<DocPageTabDirective> = new QueryList<DocPageTabDirective>();

  constructor(
    @Inject(NGX_DOC_DEFAULT_PAGE_TABS) public readonly defaultTabs: string[]
  ) {}

  getRouterLink(tab = ''): string {
    return `./${tab.replace(/ /g, '_')}`;
  }
}
