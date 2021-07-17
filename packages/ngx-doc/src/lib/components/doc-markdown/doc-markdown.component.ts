import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

export type MarkdownLang = 'typescript' | 'markup' | 'bash' | 'css' | 'scss';

@Component({
  selector: 'ngx-doc-markdown',
  templateUrl: './doc-markdown.component.html',
  styleUrls: ['./doc-markdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocMarkdownComponent {
  @Input() filename = '';

  @Input() code = '';

  @Input() lang?: MarkdownLang;
}
