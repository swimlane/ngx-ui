import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-progress-file-upload-example',
  templateUrl: './progress-file-upload-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressFileUploadExampleComponent {
  readonly autoUploadOptions = {
    url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    autoUpload: true,
  };
}
