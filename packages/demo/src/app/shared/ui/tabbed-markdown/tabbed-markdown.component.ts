import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'demo-tabbed-markdown',
  template: `
    <ngx-tabs>
      <ngx-tab
        *ngFor="let markdown of $any(markdowns) | keyvalue"
        [label]="markdown.key"
      >
        <demo-markdown [data]="markdown.value"></demo-markdown>
      </ngx-tab>
    </ngx-tabs>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 1rem 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabbedMarkdownComponent {
  @Input() markdowns: Record<string, string>;
}
