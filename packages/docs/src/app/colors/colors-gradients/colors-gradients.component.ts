import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-colors-gradients',
  template: `
    <ngx-doc-example heading="Linear Gradient" id="linear-gradient">
      <div class="colors-gradients">
        <div
          class="colors-gradients__gradient"
          *ngFor="let gradient of gradients"
        >
          <span
            class="colors-gradients__block"
            [style.backgroundImage]="'var(--ngx-ui-' + gradient + ')'"
          ></span>
          <code class="colors-gradients__code">--ngx-ui-{{ gradient }}</code>
        </div>
      </div>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Background Linear Gradient"
      id="bg-linear-gradient"
    >
      <div class="colors-gradients">
        <div
          class="colors-gradients__gradient"
          *ngFor="let gradient of ['bg-linear-1', 'bg-linear-2', 'bg-linear-3']"
        >
          <span
            class="colors-gradients__block"
            [style.backgroundImage]="'var(--ngx-ui-' + gradient + ')'"
          ></span>
          <code class="colors-gradients__code">--ngx-ui-{{ gradient }}</code>
        </div>
      </div>
    </ngx-doc-example>

    <ngx-doc-example
      heading="Background Radial Gradient"
      id="bg-radial-gradient"
    >
      <div class="colors-gradients">
        <div
          class="colors-gradients__gradient"
          *ngFor="let gradient of ['bg-radial-1', 'bg-radial-2']"
        >
          <span
            class="colors-gradients__block"
            [style.backgroundImage]="'var(--ngx-ui-' + gradient + ')'"
          ></span>
          <code class="colors-gradients__code">--ngx-ui-{{ gradient }}</code>
        </div>
      </div>
    </ngx-doc-example>
  `,
  styles: [
    // language=scss
    `
      .colors-gradients {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(0, 1fr);
        gap: 1rem;

        &__gradient {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        &__block {
          height: 8rem;
        }

        &__code {
          font-size: smaller;
          letter-spacing: -0.05rem;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsGradientsComponent {
  gradients = [
    'gradient-blue',
    'gradient-blue-green',
    'gradient-blue-red',
    'gradient-blue-purple',
    'gradient-red-orange',
    'gradient-orange-purple',
  ];
}
