import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXTENDED_WEIGHTS } from '../constants';

@Component({
  selector: 'docs-colors-grey',
  template: `
    <ngx-doc-example heading="Grey" id="grey">
      <div class="hue-container">
        <section
          class="hue-container__section"
          *ngFor="let hue of extendedHues | keyvalue"
        >
          <docs-color-title
            [color]="hue.value.text"
            [cssVar]="'--ngx-ui-color-' + hue.key"
          ></docs-color-title>
          <div class="hue-container__blocks">
            <docs-color-block
              *ngFor="let weight of $any(hue.value).weights"
              [cssVar]="'--ngx-ui-color-' + hue.key + '-' + weight"
              [weight]="weight"
            ></docs-color-block>
          </div>
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
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        &__blocks {
          display: grid;
          grid-auto-flow: column;
          gap: 1rem;
          grid-template-rows: repeat(2, minmax(0, 1fr));
          grid-auto-columns: minmax(0, 1fr);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsGreyComponent {
  extendedHues = {
    grey: {
      text: 'Grey',
      weights: EXTENDED_WEIGHTS,
    },
    'blue-grey': {
      text: 'Blue Grey',
      weights: EXTENDED_WEIGHTS,
    },
  };
}
