import {
  Component,
  Input,
  Output,
  EventEmitter,
  NgZone,
  ViewEncapsulation,
  OnInit,
  ContentChild,
  TemplateRef,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FileUploaderOptions, FileUploader, FileItem } from '@swimlane/ng2-file-upload';

import { FileButtonStyleType } from './file-button-style.type';

let nextId = 0;

@Component({
  exportAs: 'ngxFileButton',
  selector: 'ngx-file-button',
  templateUrl: './file-button.component.html',
  styleUrls: ['./file-button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileButtonComponent implements OnInit {
  @Input() id: string = `input-${++nextId}`;
  @Input() name: string;
  @Input() styleType = FileButtonStyleType.standard;
  @Input() uploader: FileUploader;
  @Input() options: FileUploaderOptions;

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(disabled) {
    this._disabled = coerceBooleanProperty(disabled);
  }

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

  @ContentChild('dropzoneTemplate')
  readonly dropzoneTemplate: TemplateRef<any>;

  @ViewChild('fileInput')
  readonly fileInput?: ElementRef<HTMLInputElement>;

  get isDisabled(): boolean {
    return this.disabled || this.uploader.isUploading;
  }

  get cssClasses(): any {
    return {
      'ngx-file-button': true,
      'standard-style': this.styleType === FileButtonStyleType.standard,
      'progress-style': this.styleType === FileButtonStyleType.progress,
      'show-progress': this.uploader && this.uploader.options.isHTML5,
      success: this._isItemSuccessful,
      active: this.uploader && this.uploader.isUploading
    };
  }

  readonly FileButtonStyleType = FileButtonStyleType;
  progress: number = 0;
  fileName: string = '';
  fileOverDropzone: boolean = false;

  private _isItemSuccessful: boolean = false;
  private _disabled: boolean = false;
  private _multiple: boolean = false;

  constructor(private readonly _ngZone: NgZone) {}

  ngOnInit(): void {
    this._ngZone.run(() => {
      if (!this.uploader && !this.options) {
        throw new Error('You must pass either an uploader instance or options.');
      }

      // if options were passed, init a new uploader
      if (!this.uploader && this.options) {
        this.uploader = new FileUploader(this.options);
      }

      // always remove after upload for this case
      this.uploader.options.removeAfterUpload = true;

      this.uploader.onAfterAddingFile = this.onAfterAddingFile.bind(this);
      this.uploader.onBeforeUploadItem = this.onBeforeUploadItem.bind(this);
      this.uploader.onProgressAll = this.onProgressAll.bind(this);
      this.uploader.onSuccessItem = this.onSuccessItem.bind(this);
      this.uploader.onErrorItem = this.onErrorItem.bind(this);
    });
  }

  onAfterAddingFile(fileItem: FileItem): void {
    this._ngZone.run(() => {
      this.fileName = fileItem.file.name;
      this.afterAddingFile.emit({ fileItem });
    });
  }

  onBeforeUploadItem(fileItem: FileItem) {
    this._ngZone.run(() => {
      this.beforeUploadItem.emit({ fileItem });
    });
  }

  onErrorItem(response: string, status: number, headers: any): void {
    this.errorItem.emit({ response, status, headers });
  }

  onProgressAll(progress: number): void {
    this._ngZone.run(() => {
      this.progress = progress;
      this.progressAll.emit({ progress });
    });
  }

  onSuccessItem(item: any, response: string, status: number, headers: any): void {
    this._ngZone.run(() => {
      this._isItemSuccessful = true;

      setTimeout(() => {
        this.fileName = '';
        this._isItemSuccessful = false;
      }, 2500);

      this.successItem.emit({ item, response, status, headers });
    });
  }

  fileOverBase(event: boolean) {
    this.fileOverDropzone = event;
  }

  clearInput() {
    this.fileInput.nativeElement.value = '';
  }
}
