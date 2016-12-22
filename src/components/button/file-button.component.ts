import { Component, Input, Output, EventEmitter, NgZone, ViewEncapsulation } from '@angular/core';
import { FileUploaderOptions, FileUploader } from 'ng2-file-upload';
import { FileButtonStyleType } from './file-button-style.type';

let nextId = 0;

@Component({
  selector: 'ngx-file-button',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./file-button.component.scss')],
  template: `
    <div [ngClass]="cssClasses">
      <button
        type="button"
        class="ngx-file-button-button"
        [disabled]="uploader.isUploading || disabled">
        <input
          ng2FileSelect
          type="file"
          class="ngx-file-button-input"
          [disabled]="disabled"
          [id]="id + '-input'"
          [name]="name + '-input'"
          [uploader]="uploader"
        />
        <label
          [class.disabled]="disabled"
          [class.btn]="styleType === 'standard'"
          [attr.for]="id + '-input'"
          class="ngx-file-button-label">
          <ng-content></ng-content>
        </label>
        <span class="ngx-file-button-text">
          {{fileName}}
        </span>
      </button>
      <div
        class="ngx-file-button-fill"
        [style.width]="progress">
      </div>
      <span class="icon-check"></span>
    </div>
  `
})
export class FileButtonComponent {

  @Input() id: string = `input-${++nextId}`;
  @Input() name: string;
  @Input() disabled: boolean;
  @Input() styleType: FileButtonStyleType = FileButtonStyleType.standard;

  // you can pass either options
  // or a instance of the uploader
  @Input() uploader: FileUploader;
  @Input() options: FileUploaderOptions;

  @Output() afterAddingFile = new EventEmitter();
  @Output() beforeUploadItem = new EventEmitter();
  @Output() successItem = new EventEmitter();
  @Output() progressAll = new EventEmitter();

  private get cssClasses() {
    return {
      'ngx-file-button': true,
      'standard-style': this.styleType === FileButtonStyleType.standard,
      'progress-style': this.styleType === FileButtonStyleType.progress,
      'show-progress': this.uploader && this.uploader.options.isHTML5,
      success: this.isItemSuccessful,
      active: this.uploader && this.uploader.isUploading
    };
  }

  private isItemSuccessful: boolean = false;
  private progress: string = '0%';
  private fileName: string = '';

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    if(!this.uploader && !this.options) {
      throw new Error('You must pass either an uploader instance or options.');
    }

    // if options were passed, init a new uploader
    if(!this.uploader && this.options) {
      this.uploader = new FileUploader(this.options);
    }

    // always remove after upload for this case
    this.uploader.options.removeAfterUpload = true;

    this.uploader.onAfterAddingFile = this.onAfterAddingFile.bind(this);
    this.uploader.onBeforeUploadItem = this.onBeforeUploadItem.bind(this);
    this.uploader.onProgressAll = this.onProgressAll.bind(this);
    this.uploader.onSuccessItem = this.onSuccessItem.bind(this);
  }

  onAfterAddingFile(fileItem) {
    this.fileName = fileItem.file.name;
    this.afterAddingFile.emit({ fileItem });
  }

  onBeforeUploadItem(fileItem) {
    this.beforeUploadItem.emit({ fileItem });
  }

  onProgressAll(progress) {
    this.ngZone.run(() => {
      this.progress = progress + '%';
    });

    this.progressAll.emit({ progress });
  }

  onSuccessItem(item, response, status, headers) {
    this.isItemSuccessful = true;

    setTimeout(() => {
      this.fileName = '';
      this.isItemSuccessful = false;
    }, 2500);

    this.successItem.emit({ item, response, status, headers });
  }

}
