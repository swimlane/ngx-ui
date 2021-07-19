import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-icons-section-container',
  template: ` <ng-content></ng-content> `,
  styles: [
    // language=scss
    `
      :host {
        display: grid;
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 1rem;

        @media (min-width: 640px) {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        @media (min-width: 768px) {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        @media (min-width: 1280px) {
          grid-template-columns: repeat(7, minmax(0, 1fr));
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsSectionContainerComponent {}
