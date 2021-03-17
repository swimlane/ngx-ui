import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownPath } from '../../../../markdown-path.type';

@Component({
  selector: 'demo-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarkdownComponent {
  @Input() path?: MarkdownPath;
  @Input() data?: string;

  get mdFilePath(): string | undefined {
    if (this.path) {
      return `/assets/markdowns/${this.path}.md`;
    }
    return undefined;
  }
}
