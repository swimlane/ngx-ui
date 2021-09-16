import { Component } from '@angular/core';
import { DocExamples } from '@swimlane/ngx-doc';
import {
  autoUploadFileButtonExampleHtml,
  autoUploadFileButtonExampleTs,
} from './examples/auto-upload-file-button';
import {
  dropzoneUploaderButtonExampleHtml,
  dropzoneUploaderButtonExampleTs,
} from './examples/dropzone-file-uploader-button';
import {
  manualFileUploadButtonExampleHtml,
  manualFileUploadButtonExampleTs,
} from './examples/manual-file-upload-button';
import {
  progressFileUploadExampleHtml,
  progressFileUploadExampleTs,
} from './examples/progress-file-upload';

@Component({
  selector: 'docs-file-upload-button',
  template: `
    <ngx-doc-example heading="File Upload" id="file-upload">
      <ngx-doc-example
        heading="Auto File Upload"
        id="auto-file-upload"
        [content]="autoUploadExample"
      >
        <docs-auto-upload-file-button-example></docs-auto-upload-file-button-example>
      </ngx-doc-example>

      <ngx-doc-example
        heading="Manual File Upload"
        id="manual-file-upload"
        [content]="manualUploadExample"
      >
        <docs-manual-file-upload-button-example></docs-manual-file-upload-button-example>
      </ngx-doc-example>

      <ngx-doc-example
        heading="Dropzone File Upload"
        id="dropzone-file-upload"
        [content]="dropzoneUploadExample"
      >
        <docs-dropzone-uploader-example></docs-dropzone-uploader-example>
      </ngx-doc-example>

      <ngx-doc-example
        heading="Progress File Upload"
        id="progress-file-upload"
        [content]="progressUploadExample"
      >
        <docs-progress-file-upload-example></docs-progress-file-upload-example>
      </ngx-doc-example>
    </ngx-doc-example>
  `,
})
export class FileUploaderButtonComponent {
  readonly autoUploadExample: DocExamples = {
    'auto-upload-btn-example.html': [autoUploadFileButtonExampleHtml, 'markup'],
    'auto-upload-btn-example.ts': [autoUploadFileButtonExampleTs, 'typescript'],
  };

  readonly manualUploadExample: DocExamples = {
    'manual-upload-btn-example.html': [
      manualFileUploadButtonExampleHtml,
      'markup',
    ],
    'manual-upload-btn-example.ts': [
      manualFileUploadButtonExampleTs,
      'typescript',
    ],
  };

  readonly dropzoneUploadExample: DocExamples = {
    'dropzone-uploader-example.html': [
      dropzoneUploaderButtonExampleHtml,
      'markup',
    ],
    'dropzone-uploader-example.ts': [
      dropzoneUploaderButtonExampleTs,
      'typescript',
    ],
  };

  readonly progressUploadExample: DocExamples = {
    'progress-upload-example.html': [progressFileUploadExampleHtml, 'markup'],
    'progress-upload-example.ts': [progressFileUploadExampleTs, 'typescript'],
  };
}
