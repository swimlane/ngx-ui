import type { ElementRef, TemplateRef } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  FileItem,
  FileUploader,
  FileUploaderOptions,
} from '@swimlane/ng2-file-upload';
import { ParsedResponseHeaders } from '@swimlane/ng2-file-upload/lib/file-uploader.class';
import { BooleanInput, NgxBooleanInput } from '@swimlane/ngx-ui/common';
import { EnumKey } from '@swimlane/ngx-ui/typings';
import { id } from '@swimlane/ngx-ui/utils';
import { FileButtonStyle } from './enums';

@Component({
  selector: 'ngx-file-button',
  exportAs: 'ngxFileButton',
  templateUrl: './file-button.component.html',
  styleUrls: ['./file-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileButtonComponent implements OnInit {
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_multiple: BooleanInput;

  @Input() id = `input-${id()}`;
  @Input() name = '';

  @Input('styleType') set _styleType(v: EnumKey<typeof FileButtonStyle>) {
    this.styleType = FileButtonStyle[v];
  }

  styleType = FileButtonStyle.standard;

  @Input() uploader?: FileUploader;
  @Input() options?: FileUploaderOptions;

  @NgxBooleanInput()
  @Input()
  disabled = false;

  @NgxBooleanInput()
  @Input()
  multiple = false;

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

  @ContentChild('dropzoneTemplate')
  readonly dropzoneTemplate?: TemplateRef<unknown>;

  @ViewChild('fileInput')
  readonly fileInput?: ElementRef<HTMLInputElement>;

  get isDisabled(): boolean {
    return this.disabled || !!this.uploader?.isUploading;
  }

  get cssClasses(): Record<string, boolean> {
    return {
      'ngx-file-button': true,
      'standard-style': this.styleType === FileButtonStyle.standard,
      'progress-style': this.styleType === FileButtonStyle.progress,
      'show-progress': !!this.uploader && !!this.uploader.options.isHTML5,
      success: this.isItemSuccessful,
      active: !!this.uploader && this.uploader.isUploading,
    };
  }

  readonly FileButtonStyle = FileButtonStyle;

  progress = 0;
  fileName = '';
  fileOverDropzone = false;

  private isItemSuccessful = false;

  constructor(public readonly ngZone: NgZone) {}

  ngOnInit(): void {
    if (!this.uploader && !this.options) {
      throw new Error('You must pass either an uploader instance or options.');
    }

    // if options were passed, init a new uploader
    if (!this.uploader && this.options) {
      this.uploader = new FileUploader(this.options);
    }

    // always remove after upload for this case
    if (this.uploader) {
      this.uploader.options.removeAfterUpload = true;
      this.uploader.onAfterAddingFile = this.onAfterAddingFile.bind(this);
      this.uploader.onBeforeUploadItem = this.onBeforeUploadItem.bind(this);
      this.uploader.onProgressAll = this.onProgressAll.bind(this);
      this.uploader.onSuccessItem = this.onSuccessItem.bind(this);
      this.uploader.onErrorItem = this.onErrorItem.bind(this);
    }
  }

  onAfterAddingFile(fileItem: FileItem): void {
    this.ngZone.run(() => {
      this.fileName = fileItem.file.name;
      this.afterAddingFile.emit({ fileItem });
    });
  }

  onBeforeUploadItem(fileItem: FileItem) {
    this.ngZone.run(() => {
      this.beforeUploadItem.emit({ fileItem });
    });
  }

  onErrorItem(
    item: FileItem,
    response: string,
    status: number,
    headers: ParsedResponseHeaders
  ): void {
    this.errorItem.emit({ item, response, status, headers });
  }

  onProgressAll(progress: number): void {
    this.ngZone.run(() => {
      this.progress = progress;
      this.progressAll.emit({ progress });
    });
  }

  onSuccessItem(
    item: FileItem,
    response: string,
    status: number,
    headers: ParsedResponseHeaders
  ): void {
    this.ngZone.run(() => {
      this.isItemSuccessful = true;

      setTimeout(() => {
        this.fileName = '';
        this.isItemSuccessful = false;
      }, 2500);

      this.successItem.emit({ item, response, status, headers });
    });
  }

  fileOverBase(isOverDropzone: boolean) {
    this.fileOverDropzone = isOverDropzone;
  }

  clearInput() {
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
