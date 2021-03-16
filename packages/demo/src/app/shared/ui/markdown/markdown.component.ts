import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

type MdFeature = 'landing' | 'style/colors';

@Component({
  selector: 'demo-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
