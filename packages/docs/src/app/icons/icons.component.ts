import iconStackingHtml from '!!raw-loader!./examples/icon-stacking.html';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'docs-icons',
  template: `
    <ngx-doc-page header="Icons">
      <ngx-doc-example heading="Icons" id="icons">
        <docs-icons-section-container>
          <docs-icon-block
            *ngFor="let icon of icons$ | async"
            [icon]="icon.name"
            code="ngx-{{ icon.name }}"
            textToCopy="ngx-{{ icon.name }}"
          ></docs-icon-block>
        </docs-icons-section-container>
      </ngx-doc-example>

      <ngx-doc-example heading="Effects" id="effects">
        <docs-icons-section-container>
          <docs-icon-block icon="refresh" code="normal"></docs-icon-block>
          <docs-icon-block
            *ngFor="let effect of iconFx"
            [extraClasses]="['text-4xl']"
            [extraIconClasses]="['icon-fx-' + effect]"
            icon="refresh"
            code="icon-fx-{{ effect }}"
          ></docs-icon-block>
        </docs-icons-section-container>
      </ngx-doc-example>

      <ngx-doc-example heading="Colors" id="colors">
        <docs-icons-section-container>
          <docs-icon-block
            *ngFor="
              let color of [
                'blue',
                'light-blue',
                'green',
                'orange',
                'red',
                'purple',
                'blue-grey',
                'grey'
              ]
            "
            [extraIconClasses]="['text-' + color]"
            icon="refresh"
            code="text-{{ color }}"
          ></docs-icon-block>
        </docs-icons-section-container>
      </ngx-doc-example>

      <ngx-doc-example heading="Stacking" id="stacking">
        <docs-icons-section-container>
          <docs-icon-block [stacked]="true">
            <span class="text-4xl icon-fx-stacked">
              <i class="ngx-icon ngx-square"></i>
              <i class="ngx-icon ngx-x text-red"></i>
            </span>
          </docs-icon-block>

          <docs-icon-block [stacked]="true">
            <span class="text-4xl icon-fx-stacked">
              <i class="ngx-icon ngx-square-filled"></i>
              <i class="ngx-icon ngx-x text-red"></i>
            </span>
          </docs-icon-block>

          <docs-icon-block [stacked]="true">
            <span class="text-4xl icon-fx-stacked">
              <i class="ngx-icon ngx-square-filled"></i>
              <i class="ngx-icon ngx-x text-red icon-fx-spinning"></i>
            </span>
          </docs-icon-block>

          <docs-icon-block [stacked]="true">
            <span class="text-4xl icon-fx-stacked">
              <i class="ngx-icon ngx-field-users"></i>
              <i class="ngx-icon ngx-circle-filled text-red icon-fx-badge"></i>
            </span>
          </docs-icon-block>
        </docs-icons-section-container>

        <ngx-doc-markdown
          [code]="iconStackingHtml"
          lang="markup"
        ></ngx-doc-markdown>
      </ngx-doc-example>
    </ngx-doc-page>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsComponent {
  readonly iconStackingHtml = iconStackingHtml;
  icons$ = from(
    // @ts-ignore
    import('../../../../ngx-ui/assets/icons/json/icons.json').then((json) =>
      json.icons.reverse()
    )
  );
  iconFx = [
    'inverse',
    'rotate-90',
    'rotate-180',
    'rotate-270',
    'flip',
    'flip-y',
    'half-sized',
    'dbl-sized',
    'badge',
    'spinning',
    'spinning-rev',
  ];
}
