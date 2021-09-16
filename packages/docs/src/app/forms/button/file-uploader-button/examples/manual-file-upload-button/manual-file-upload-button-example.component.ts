import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileUploader } from '@swimlane/ng2-file-upload';

@Component({
  selector: 'docs-manual-file-upload-button-example',
  templateUrl: './manual-file-upload-button-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManualFileUploadButtonExampleComponent {
  readonly manualUploaderInstance = new FileUploader({
    url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    autoUpload: false,
  });
}
