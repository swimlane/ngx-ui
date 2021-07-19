import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'docs-icon-block',
  template: `
    <ng-container *ngIf="stacked; else normal">
      <div class="stacked-container shadow-2 shadow-fx">
        <ng-content></ng-content>
      </div>
    </ng-container>
    <ng-template #normal>
      <div
        *ngIf="textToCopy; else noCopy"
        class="normal-container shadow-2 shadow-fx"
        [ngClass]="extraClasses"
        ngxCopyToClipboard="dblclk"
        [ngxCopyToClipboardText]="textToCopy"
      >
        <ng-container *ngTemplateOutlet="child"></ng-container>
      </div>

      <ng-template #noCopy>
        <div
          class="no-copy-container shadow-2 shadow-fx"
          [ngClass]="extraClasses"
        >
          <ng-container *ngTemplateOutlet="child"></ng-container>
        </div>
      </ng-template>

      <ng-template #child>
        <ngx-icon
          class="large-icon"
          [ngClass]="extraIconClasses"
          [fontIcon]="icon"
        ></ngx-icon>
        <code class="large-icon-code">{{ code }}</code>
      </ng-template>
    </ng-template>
  `,
  styles: [
    // language=scss
    `
      .stacked-container {
        height: 8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--ngx-ui-color-blue-grey-800);
        border-radius: 0.25rem;
      }

      .normal-container {
        height: 8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 0.5rem;
        border: 1px solid var(--ngx-ui-color-blue-grey-800);
        border-radius: 0.25rem;
        text-align: center;
        cursor: pointer;
      }

      .no-copy-container {
        height: 8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 0.5rem;
        border: 1px solid var(--ngx-ui-color-blue-grey-800);
        border-radius: 0.25rem;
        text-align: center;
      }

      .large-icon {
        font-size: xx-large;
      }

      .large-icon-code {
        font-size: smaller;
        letter-spacing: -0.025rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconBlockComponent {
  @Input() stacked = false;
  @Input() textToCopy?: string;
  @Input() icon!: string;
  @Input() code!: string;
  @Input() extraClasses: string[] = [];
  @Input() extraIconClasses: string[] = [];
}
