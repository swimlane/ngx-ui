import { Clipboard } from '@angular/cdk/clipboard';
import { DOCUMENT } from '@angular/common';
import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {
  NotificationService,
  NotificationStyleType,
} from '@swimlane/ngx-ui/notification';
import { DocContentHandler, DocExamples } from '../../models';
import { NGX_DOC_CONTENT_PROCESSOR } from '../../tokens';

@Component({
  selector: 'ngx-doc-example[heading]',
  templateUrl: './doc-example.component.html',
  styleUrls: ['./doc-example.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocExampleComponent {
  @Input() heading = '';

  @Input() description = '';

  @Input() set content(v: DocExamples) {
    this.processedContent = this.docContentProcessor(v);
  }

  processedContent: DocExamples = {};

  get hasContent(): boolean {
    return !!Object.keys(this.processedContent).length;
  }

  constructor(
    @Attribute('id') readonly id: string | null,
    @Inject(NGX_DOC_CONTENT_PROCESSOR)
    private readonly docContentProcessor: DocContentHandler<
      DocExamples,
      DocExamples
    >,
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly clipboard: Clipboard,
    private readonly notificationService: NotificationService
  ) {}

  copySectionLink() {
    const hashPosition = this.document.location.href.indexOf('#');
    const currentUrl =
      hashPosition > -1
        ? this.document.location.href.substr(0, hashPosition)
        : this.document.location.href;
    const url = `${currentUrl}#${this.id}`;

    this.clipboard.copy(url);
    this.notificationService.create({
      title: 'Copied to clipboard',
      body: url,
      styleType: NotificationStyleType.info,
    });
  }
}
