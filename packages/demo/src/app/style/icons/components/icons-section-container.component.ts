import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'demo-icons-section-container',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconsSectionContainerComponent {
  @HostBinding('class') hostClass = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4';
}
