import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {
  NotificationService,
  NotificationStyleType,
} from '@swimlane/ngx-ui/notification';

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

  @Input() allowCopy = false;

  constructor(private readonly notify: NotificationService) {}

  copied() {
    this.notify.create({
      title: 'Copied!',
      styleType: NotificationStyleType.success,
    });
  }
}
