import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileUploader } from '@swimlane/ng2-file-upload';

@Component({
  selector: 'docs-dropzone-uploader-example',
  templateUrl: './dropzone-file-uploader-button-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropzoneFileUploaderButtonExampleComponent {
  readonly manualUploaderInstance = new FileUploader({
    url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    autoUpload: false,
  });
}
