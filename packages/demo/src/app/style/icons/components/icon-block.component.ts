import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'demo-icon-block',
  template: `
    <ng-container *ngIf="stacked; else normal">
      <div class="h-32 flex items-center justify-center shadow-2 shadow-fx border border-gray-800 rounded">
        <ng-content></ng-content>
      </div>
    </ng-container>
    <ng-template #normal>
      <div
        *ngIf="textToCopy; else noCopy"
        class="h-32 flex flex-col gap-2 items-center justify-center shadow-2 shadow-fx border border-gray-800 rounded text-center cursor-pointer"
        [ngClass]="extraClasses"
        copyToClipboard="dblclk"
        [copyToClipboardText]="textToCopy"
      >
        <ng-container *ngTemplateOutlet="child"></ng-container>
      </div>

      <ng-template #noCopy>
        <div
          class="h-32 flex flex-col gap-2 items-center justify-center shadow-2 shadow-fx border border-gray-800 rounded text-center"
          [ngClass]="extraClasses"
        >
          <ng-container *ngTemplateOutlet="child"></ng-container>
        </div>
      </ng-template>

      <ng-template #child>
        <ngx-icon class="text-4xl" [ngClass]="extraIconClasses" [fontIcon]="icon"></ngx-icon>
        <code class="text-xs tracking-tight">{{ code }}</code>
      </ng-template>
    </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconBlockComponent {
  @Input() stacked = false;
  @Input() textToCopy?: string;
  @Input() icon!: string;
  @Input() code!: string;
  @Input() extraClasses: string[] = [];
  @Input() extraIconClasses: string[] = [];
}
