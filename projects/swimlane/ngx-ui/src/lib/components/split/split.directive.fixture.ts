import { Component, ChangeDetectionStrategy, ViewChild, ViewChildren } from '@angular/core';

import type { QueryList } from '@angular/core';

import { SplitDirective } from './split.directive';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleComponent } from './split-handle.component';

@Component({
  selector: 'ngx-split-fixture',
  template: `
    <div ngxSplit="row">
      <div ngxSplitArea="1 1 50%"></div>
      <div ngxSplitHandle></div>
      <div ngxSplitArea="1 1 50%"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class SplitDirectiveFixture {
  @ViewChild(SplitDirective, { static: false })
  readonly split: SplitDirective;

  @ViewChild(SplitHandleComponent, { static: false })
  readonly splitHandle: SplitHandleComponent;

  @ViewChildren(SplitAreaDirective)
  readonly splitAreas: QueryList<SplitAreaDirective>;
}
