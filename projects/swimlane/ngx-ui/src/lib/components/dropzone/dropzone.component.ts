import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FileUploaderOptions, FileUploader, FileItem } from '@swimlane/ng2-file-upload';
import { id } from '../../utils/id/id.util';

@Component({
  selector: 'ngx-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DropzoneComponent implements OnInit {
  @Input() id: string = `input-${id()}`;
  @Input() acceptedFileFormats: string[]; // supported file extensions
  @Input() uploader: FileUploader;
  @Input() options: FileUploaderOptions;
  @Input()
  get multiple() {
    return this._multiple;
  }
  set multiple(multiple) {
    this._multiple = coerceBooleanProperty(multiple);
  }

  @Output() afterAddingFile = new EventEmitter<{ fileItem: FileItem }>();
  @Output() beforeUploadItem = new EventEmitter<{ fileItem: FileItem }>();
  @Output() successItem = new EventEmitter<{ item: any; response: string; status: number; headers: any }>();
  @Output() errorItem = new EventEmitter<{ response: string; status: number; headers: any }>();
  @Output() progressAll = new EventEmitter<{ progress: number }>();

  acceptedFileFormatsTextDisplay: string;

  private _multiple: boolean = true;

  ngOnInit(): void {
    if (this.acceptedFileFormats && this.acceptedFileFormats.length) {
      this.acceptedFileFormats.forEach((fileFormat, idx) => {
        if (fileFormat[0] !== '.') {
          this.acceptedFileFormats[idx] = '.' + fileFormat;
        }
      });
      this.acceptedFileFormatsTextDisplay =
        this.acceptedFileFormats.slice(0, -1).join(', ') + ' and ' + this.acceptedFileFormats.slice(-1);
    }
  }
}
