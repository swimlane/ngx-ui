import { Component, ChangeDetectionStrategy, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SplitDirective } from './split.directive';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleComponent } from './split-handle.component';

@Component({
  selector: `ngx-split-fixture`,
  template: `
    <div ngxSplit="row">
      <div [fxFlex]="flex$ | async" ngxSplitArea></div>
      <div ngxSplitHandle></div>
      <div [fxFlex]="flex$ | async" ngxSplitArea></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplitDirectiveFixture {
  readonly flex$ = new BehaviorSubject<string>('1 1 50%');

  @ViewChild(SplitDirective, { static: false })
  readonly split: SplitDirective;

  @ViewChild(SplitHandleComponent, { static: false })
  readonly splitHandle: SplitHandleComponent;

  @ViewChildren(SplitAreaDirective)
  readonly splitAreas: QueryList<SplitAreaDirective>;
}
