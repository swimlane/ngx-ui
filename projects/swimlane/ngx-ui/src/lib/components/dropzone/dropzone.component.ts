import { Component, NgZone, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { FileButtonComponent } from '../button/file-button.component';

@Component({
  selector: 'ngx-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DropzoneComponent extends FileButtonComponent {
  @Input() acceptedFileFormats: string[];
  acceptedFileFormatsTextDisplay: string;

  constructor(public readonly _ngZone: NgZone) {
    super(_ngZone);
  }

  ngOnInit(): void {
    if (this.acceptedFileFormats && this.acceptedFileFormats.length) {
      this.acceptedFileFormatsTextDisplay =
        this.acceptedFileFormats.slice(0, -1).join(', ') + ' and ' + this.acceptedFileFormats.slice(-1);
    }
  }
}
