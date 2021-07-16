import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ngx-doc-markdown[code]',
  templateUrl: './doc-markdown.component.html',
  styleUrls: ['./doc-markdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocMarkdownComponent {
  @Input() filename = '';

  @Input() code = '';

  @Input() lang?: 'typescript' | 'markup' | 'bash' | 'css' | 'scss';
}
