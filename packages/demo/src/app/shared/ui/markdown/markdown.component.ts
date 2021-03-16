import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type MdFeature = 'landing' | 'style/colors';

@Component({
  selector: 'demo-markdown',
  template: `
    <markdown *ngIf="filePath; else noFile" [src]="filePath"></markdown>
    <ng-template #noFile>
      <markdown *ngIf="data; else noData" [data]="data"></markdown>
      <ng-template #noData>
        <markdown>
          <ng-content></ng-content>
        </markdown>
      </ng-template>
    </ng-template>
  `,
  styleUrls: ['./markdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownComponent {
  @Input() feature?: MdFeature;
  @Input() fileName?: string;
  @Input() data?: string;

  get filePath(): string | undefined {
    if (this.feature && this.fileName) {
      return `/assets/markdowns/${this.feature}/${this.fileName}.md`;
    }
    return undefined;
  }
}
