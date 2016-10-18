import { Component, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { FileUploaderOptions, FileUploader } from 'ng2-file-upload';
import './file-button.scss';

let nextId = 0;

@Component({
  selector: 'swui-file-button',
  template: `
    <div
      class="swui-file-button"
      [class.show-progress]="uploader.isHTML5"
      [class.success]="isItemSuccessful"
      [class.active]="uploader.isUploading">
      <button
        type="button"
        class="swui-file-button-button"
        [disabled]="uploader.isUploading || disabled">
        <input
          ng2FileSelect
          type="file"
          ngControl="id"
          [disabled]="disabled"
          [id]="id"
          [name]="name + '-input'"
          [uploader]="uploader"
        />
        <label
          [attr.for]="id"
          class="swui-file-button-label">
          <ng-content></ng-content>
        </label>
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
  @Input() options: FileUploaderOptions;

  @Output() onBeforeUploadItem = new EventEmitter();
  @Output() onSuccessItem = new EventEmitter();

  private uploader: FileUploader;
  private isItemSuccessful: boolean = false;
  private progress: string = '0%';

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    // always remove after upload for this case
    this.options.removeAfterUpload = true;

    this.uploader = new FileUploader(this.options);

    this.uploader.onBeforeUploadItem = (fileItem) => {
      this.onBeforeUploadItem.emit({ fileItem });
    };

    this.uploader.onProgressAll = (progress) => {
      this.ngZone.run(() => {
        this.progress = progress + '%';
      });
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      this.onSuccessItem.emit({ item, response, status, headers });
      this.isItemSuccessful = true;

      // after success, reset back to empty
      setTimeout(() => {
        this.isItemSuccessful = false;
      }, 2500);
    };
  }

}
