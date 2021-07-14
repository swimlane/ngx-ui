import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FileItem,
  FileUploader,
  FileUploaderOptions,
  ParsedResponseHeaders,
} from '@swimlane/ng2-file-upload';
import { BooleanInput, NgxBooleanInput } from '@swimlane/ngx-ui/common';
import { id } from '@swimlane/ngx-ui/utils';

@Component({
  selector: 'ngx-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropzoneComponent implements OnInit {
  static ngAcceptInputType_multiple: BooleanInput;

  @HostBinding('class.ngx-dropzone') hostClass = true;

  @Input() id = `input-${id()}`;
  @Input() acceptedFileFormats: string[] = [];
  @Input() uploader?: FileUploader;
  @Input() options?: FileUploaderOptions;

  @NgxBooleanInput()
  @Input()
  multiple = true;

  @Output() afterAddingFile = new EventEmitter<{ fileItem: FileItem }>();
  @Output() beforeUploadItem = new EventEmitter<{ fileItem: FileItem }>();
  @Output() successItem = new EventEmitter<{
    item: FileItem;
    response: string;
    status: number;
    headers: ParsedResponseHeaders;
  }>();
  @Output() errorItem = new EventEmitter<{
    item: FileItem;
    response: string;
    status: number;
    headers: ParsedResponseHeaders;
  }>();
  @Output() progressAll = new EventEmitter<{ progress: number }>();

  acceptedFileFormatsTextDisplay = '';

  ngOnInit(): void {
    if (this.acceptedFileFormats && this.acceptedFileFormats.length) {
      this.acceptedFileFormatsTextDisplay =
        this.acceptedFileFormats.slice(0, -1).join(', ') +
        ' and ' +
        this.acceptedFileFormats.slice(-1);
    }
  }
}
