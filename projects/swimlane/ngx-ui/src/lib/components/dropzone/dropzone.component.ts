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
import { FileUploaderOptions, FileUploader, FileItem } from 'ng2-file-upload';
import { id } from '../../utils/id/id.util';
import { listFormatter } from '../../utils/list-format/list-format.util';

export enum DropzoneSize {
  Small = 'small',
  Large = 'large'
}

@Component({
  selector: 'ngx-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DropzoneComponent implements OnInit {
  @Input() id = `input-${id()}`;
  @Input() acceptedFileFormats: string[];
  @Input() uploader: FileUploader;
  @Input() options: FileUploaderOptions;
  @Input() size: DropzoneSize = DropzoneSize.Large;
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
  DropzoneSize = DropzoneSize;

  private _multiple = true;

  ngOnInit(): void {
    if (this.acceptedFileFormats && this.acceptedFileFormats.length) {
      this.acceptedFileFormatsTextDisplay = listFormatter.format(this.acceptedFileFormats);
    }
  }
}
