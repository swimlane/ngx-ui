import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NORMAL_WEIGHTS } from '../constants';

@Component({
  selector: 'docs-colors-hue',
  template: `
    <ngx-doc-example heading="Hue" id="hue">
      <div class="hue-container">
        <section
          class="hue-container__section"
          *ngFor="let hue of hues | keyvalue"
        >
          <docs-color-title
            class="hue-container__title"
            [color]="hue.value.text"
            [cssVar]="'--ngx-ui-color-' + hue.key"
          ></docs-color-title>
          <docs-color-block
            class="hue-container__color"
            *ngFor="let weight of $any(hue.value).weights"
            [cssVar]="'--ngx-ui-color-' + hue.key + '-' + weight"
            [weight]="weight"
          ></docs-color-block>
        </section>
      </div>
    </ngx-doc-example>
  `,
  styles: [
    // language=scss
    `
      .hue-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        &__section {
          display: grid;
          grid-template-columns: repeat(11, minmax(0, 1fr));
          column-gap: 1rem;
        }

        &__title {
          grid-column: span 2 / span 2;
        }

        &__color {
          grid-column: span 1 / span 1;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsHueComponent {
  hues = {
    blue: {
      text: 'Blue',
      weights: NORMAL_WEIGHTS,
    },
    'light-blue': {
      text: 'Light Blue',
      weights: NORMAL_WEIGHTS,
    },
    green: {
      text: 'Green',
      weights: NORMAL_WEIGHTS,
    },
    red: {
      text: 'Red',
      weights: NORMAL_WEIGHTS,
    },
    orange: {
      text: 'Orange',
      weights: NORMAL_WEIGHTS,
    },
    purple: {
      text: 'Purple',
      weights: NORMAL_WEIGHTS,
    },
  };
}
