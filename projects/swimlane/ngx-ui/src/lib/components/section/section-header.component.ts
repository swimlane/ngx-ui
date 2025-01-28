import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-section-header',
  exportAs: 'ngxSectionHeader',
  template: ' <ng-content></ng-content> ',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class SectionHeaderComponent {}
