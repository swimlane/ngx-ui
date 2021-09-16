import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from '@swimlane/ng2-file-upload';
import {
  DocExampleModule,
  DocMarkdownModule,
  DocPageModule,
  generateRoutes,
} from '@swimlane/ngx-doc';
import { ButtonModule } from '@swimlane/ngx-ui/button';
import { FileButtonModule } from '@swimlane/ngx-ui/file-button';
import { LongPressButtonModule } from '@swimlane/ngx-ui/long-press-button';
import { ButtonPageComponent } from './button-page.component';
import { CssButtonComponent } from './css-button/css-button.component';
import { CssBasicButtonExampleComponent } from './css-button/examples/css-button-example/css-basic-button-example.component';
import { CssButtonSizesExampleComponent } from './css-button/examples/css-button-sizes-example/css-button-sizes-example.component';
import { CssIconButtonExampleComponent } from './css-button/examples/css-icon-button-example/css-icon-button-example.component';
import { CssLinkButtonsExampleComponent } from './css-button/examples/css-link-buttons-example/css-link-buttons-example.component';
import { AutoUploadFileButtonExampleComponent } from './file-uploader-button/examples/auto-upload-file-button/auto-upload-file-button-example.component';
import { DropzoneFileUploaderButtonExampleComponent } from './file-uploader-button/examples/dropzone-file-uploader-button/dropzone-file-uploader-button-example.component';
import { ManualFileUploadButtonExampleComponent } from './file-uploader-button/examples/manual-file-upload-button/manual-file-upload-button-example.component';
import { ProgressFileUploadExampleComponent } from './file-uploader-button/examples/progress-file-upload/progress-file-upload-example.component';
import { FileUploaderButtonComponent } from './file-uploader-button/file-uploader-button.component';
import { LongPressButtonExampleComponent } from './long-press-button/examples/long-press-button-example/long-press-button-example.component';
import { NgxLongPressButtonComponent } from './long-press-button/ngx-long-press-button.component';
import { BasicNgxButtonComponent } from './ngx-button/examples/basic-ngx-button/basic-ngx-button.component';
import { NgxButtonComponent } from './ngx-button/ngx-button.component';

@NgModule({
  declarations: [
    ButtonPageComponent,
    CssButtonComponent,
    CssBasicButtonExampleComponent,
    CssIconButtonExampleComponent,
    CssButtonSizesExampleComponent,
    CssLinkButtonsExampleComponent,
    NgxButtonComponent,
    BasicNgxButtonComponent,
    FileUploaderButtonComponent,
    AutoUploadFileButtonExampleComponent,
    ManualFileUploadButtonExampleComponent,
    DropzoneFileUploaderButtonExampleComponent,
    ProgressFileUploadExampleComponent,
    NgxLongPressButtonComponent,
    LongPressButtonExampleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(generateRoutes(ButtonPageComponent)),
    DocPageModule,
    DocMarkdownModule,
    DocExampleModule,
    ButtonModule,
    FileButtonModule,
    FileUploadModule,
    LongPressButtonModule,
  ],
})
export class ButtonPageModule {}
