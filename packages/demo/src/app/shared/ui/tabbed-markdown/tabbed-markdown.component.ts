import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownPath } from '../../../../markdown-path.type';

@Component({
  selector: 'demo-tabbed-markdown',
  template: `
    <ngx-tabs *ngIf="!pathsLength; else usePaths">
      <ngx-tab *ngFor="let markdown of $any(markdowns) | keyvalue" [label]="markdown.key">
        <demo-markdown [data]="markdown.value"></demo-markdown>
      </ngx-tab>
    </ngx-tabs>
    <ng-template #usePaths>
      <ngx-tabs>
        <ngx-tab *ngFor="let path of $any(paths) | keyvalue" [label]="path.key">
          <demo-markdown [path]="$any(path.value)"></demo-markdown>
        </ngx-tab>
      </ngx-tabs>
    </ng-template>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 1rem 0;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabbedMarkdownComponent {
  @Input() markdowns: Record<string, string>;

  @Input() set htmlPath(v: MarkdownPath) {
    this.paths['Markup'] = v;
  }

  @Input() set tsPath(v: MarkdownPath) {
    this.paths['TypeScript'] = v;
  }

  @Input() set stylePath(v: MarkdownPath) {
    this.paths['SCSS'] = v;
  }

  paths: Record<string, MarkdownPath> = {};

  get pathsLength() {
    return Object.keys(this.paths).length;
  }
}
