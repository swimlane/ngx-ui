import bordersGlowMd from '!!raw-loader!./docs/borders-glow.md';
import shadowMd from '!!raw-loader!./docs/shadow.md';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NORMAL_WEIGHTS } from '../constants';

@Component({
  selector: 'docs-colors-miscs',
  template: `
    <ngx-doc-example heading="Borders and Glows" id="borders-and-glows">
      <ngx-doc-markdown [code]="bordersGlowMd"></ngx-doc-markdown>
      <div class="colors-miscs">
        <ng-container *ngFor="let weight of normalWeights">
          <ng-container
            *ngFor="
              let color of [
                'blue',
                'light-blue',
                'green',
                'orange',
                'red',
                'purple'
              ]
            "
          >
            <code class="colors-miscs__glow-code glow-{{ color }}-{{ weight }}">
              .glow-{{ color }}-{{ weight }}
            </code>
          </ng-container>
        </ng-container>
      </div>
    </ngx-doc-example>

    <ngx-doc-example heading="Shadows" id="shadows">
      <ngx-doc-markdown [code]="shadowMd"></ngx-doc-markdown>
      <div class="colors-miscs">
        <div
          *ngFor="let shadow of shadows"
          class="colors-miscs__shadow shadow-{{ shadow }}"
        >
          <code class="colors-miscs__shadow-code">.shadow-{{ shadow }}</code>
        </div>
        <div class="colors-miscs__shadow shadow-10 shadow-fx">
          <code class="colors-miscs__shadow-code">.shadow-fx</code>
        </div>
      </div>
    </ngx-doc-example>
  `,
  styles: [
    // language=scss
    `
      .colors-miscs {
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 1rem;

        &__glow-code {
          height: 3rem;
          font-size: smaller;
          letter-spacing: -0.025rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &__shadow {
          height: 6rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        &__shadow-code {
          font-size: smaller;
          letter-spacing: -0.025rem;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsMiscsComponent {
  readonly bordersGlowMd = bordersGlowMd;
  readonly shadowMd = shadowMd;

  normalWeights = NORMAL_WEIGHTS;
  shadows = Array.from({ length: 24 })
    .fill(undefined)
    .map((_, index) => index + 1);
}
