import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
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
    >
  ) {}
}
