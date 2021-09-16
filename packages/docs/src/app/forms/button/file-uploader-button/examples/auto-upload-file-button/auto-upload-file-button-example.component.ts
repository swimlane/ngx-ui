import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-auto-upload-file-button-example',
  templateUrl: './auto-upload-file-button-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoUploadFileButtonExampleComponent {
  readonly autoUploadOptions = {
    url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    autoUpload: true,
  };
}
