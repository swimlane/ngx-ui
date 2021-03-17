import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownPath } from '../../../../markdown-path.type';

@Component({
  selector: 'demo-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownComponent {
  @Input() markdownPath?: MarkdownPath;
  @Input() data?: string;

  get mdFilePath(): string | undefined {
    if (this.markdownPath) {
      return `/assets/markdowns/${this.markdownPath}.md`;
    }
    return undefined;
  }
}
