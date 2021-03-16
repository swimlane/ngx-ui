import type { BooleanInput } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import type { FileUploaderOptions, ParsedResponseHeaders } from '@swimlane/ng2-file-upload';
import { FileItem, FileSelectDirective, FileUploader } from '@swimlane/ng2-file-upload';
import { InputBoolean } from '@swimlane/ngx-ui/decorators/input-boolean';
import { InputEnum } from '@swimlane/ngx-ui/decorators/input-enum';
import type { EnumKey } from '@swimlane/ngx-ui/types';
import { timer } from 'rxjs';
import { FileButtonStyle } from './enums';

let nextId = 0;

@Component({
  selector: 'ngx-file-button',
  exportAs: 'ngxFileButton',
  templateUrl: './file-button.component.html',
  styleUrls: ['./file-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileButtonComponent implements OnInit {
  static ngAcceptInputType_disabled: BooleanInput;
  static ngAcceptInputType_multiple: BooleanInput;

  @Input() id = `input-${++nextId}`;
  @Input() name?: string;

  @InputEnum(FileButtonStyle)
  @Input('styleType')
  _styleType!: EnumKey<typeof FileButtonStyle>;
  styleType = FileButtonStyle.standard;

  @Input() uploader?: FileUploader;
  @Input() options?: FileUploaderOptions;

  @InputBoolean()
  @Input()
  disabled = false;

  @InputBoolean()
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
    response: string;
    status: number;
    headers: ParsedResponseHeaders;
  }>();
  @Output() progressAll = new EventEmitter<{ progress: number }>();

  @ContentChild(TemplateRef) readonly dropzoneTemplate!: TemplateRef<unknown>;
  @ViewChild(FileSelectDirective, { read: ElementRef })
  readonly fileInput?: ElementRef<HTMLInputElement>;

  get isStandardType(): boolean {
    return this._styleType === FileButtonStyle.standard;
  }

  get isDisabled(): boolean {
    return this.disabled || this.uploader?.isUploading || false;
  }

  private _isItemSuccessful = false;

  get mainClasses() {
    return {
      'ngx-file-button': true,
      'standard-style': this._styleType === FileButtonStyle.standard,
      'progress-style': this._styleType === FileButtonStyle.progress,
      'show-progress': this.uploader && this.uploader.options.isHTML5,
      success: this._isItemSuccessful,
      active: this.uploader && this.uploader.isUploading
    };
  }

  progress = 0;
  fileName = '';
  fileOverDropzone = false;

  constructor(private readonly ngZone: NgZone) {}

  ngOnInit(): void {
    this.ngZone.run(() => {
      if (!this.uploader && !this.options) {
        throw new Error('You must pass either an uploader instance or options.');
      }

      // if options were passed, init a new uploader
      if (!this.uploader && this.options) {
        this.uploader = new FileUploader(this.options);
      }

      // always remove after upload for this case
      this.uploader!.options.removeAfterUpload = true;

      this.uploader!.onAfterAddingFile = this.onAfterAddingFile.bind(this);
      this.uploader!.onBeforeUploadItem = this.onBeforeUploadItem.bind(this);
      this.uploader!.onProgressAll = this.onProgressAll.bind(this);
      this.uploader!.onSuccessItem = this.onSuccessItem.bind(this);
      this.uploader!.onErrorItem = this.onErrorItem.bind(this);
    });
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

  onErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): void {
    this.errorItem.emit({ response, status, headers });
  }

  onProgressAll(progress: number): void {
    this.ngZone.run(() => {
      this.progress = progress;
      this.progressAll.emit({ progress });
    });
  }

  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): void {
    this.ngZone.run(() => {
      this._isItemSuccessful = true;

      timer(2500).subscribe(() => {
        this.fileName = '';
        this._isItemSuccessful = false;
      });

      this.successItem.emit({ item, response, status, headers });
    });
  }

  fileOverBase(event: boolean) {
    this.fileOverDropzone = event;
  }

  clearInput() {
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
