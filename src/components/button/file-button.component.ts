import { Component, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { FileUploaderOptions, FileUploader } from 'ng2-file-upload';

import { FileButtonStyleType } from './file-button-style.type';
import './file-button.scss';

let nextId = 0;

@Component({
  selector: 'swui-file-button',
  template: `
    <div [ngClass]="cssClasses">
      <button
        type="button"
        class="swui-file-button-button"
        [disabled]="uploader.isUploading || disabled">
        <input
          ng2FileSelect
          type="file"
          class="swui-file-button-input"
          [disabled]="disabled"
          [id]="id + '-input'"
          [name]="name + '-input'"
          [uploader]="uploader"
        />
        <label
          [class.disabled]="disabled"
          [class.btn]="styleType === 'standard'"
          [attr.for]="id + '-input'"
          class="swui-file-button-label">
          <ng-content></ng-content>
        </label>
        <span class="swui-file-button-text">
          {{fileName}}
        </span>
      </button>
      <div
        class="swui-file-button-fill"
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

  @Output() onAfterAddingFile = new EventEmitter();
  @Output() onBeforeUploadItem = new EventEmitter();
  @Output() onSuccessItem = new EventEmitter();
  @Output() onProgressAll = new EventEmitter();

  private get cssClasses() {
    return {
      'swui-file-button': true,
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

    this.uploader.onAfterAddingFile = this.afterAddingFile.bind(this);
    this.uploader.onBeforeUploadItem = this.beforeUploadItem.bind(this);
    this.uploader.onProgressAll = this.progressAll.bind(this);
    this.uploader.onSuccessItem = this.successItem.bind(this);
  }

  afterAddingFile(fileItem) {
    this.fileName = fileItem.file.name;
    this.onAfterAddingFile.emit({ fileItem });
  }

  beforeUploadItem(fileItem) {
    this.onBeforeUploadItem.emit({ fileItem });
  }

  progressAll(progress) {
    this.ngZone.run(() => {
      this.progress = progress + '%';
    });

    this.onProgressAll.emit({ progress });
  }

  successItem(item, response, status, headers) {
    this.isItemSuccessful = true;

    setTimeout(() => {
      this.fileName = '';
      this.isItemSuccessful = false;
    }, 2500);

    this.onSuccessItem.emit({ item, response, status, headers });
  }

}
