import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DocExampleModule, DocMarkdownModule,
  DocPageModule,
  generateRoutes
} from '@swimlane/ngx-doc';
import { CopyToClipboardModule } from '@swimlane/ngx-ui/copy-to-clipboard';
import { ColorsGradientsComponent } from './colors-gradients/colors-gradients.component';
import { ColorsGreyComponent } from './colors-grey/colors-grey.component';
import { ColorsHueComponent } from './colors-hue/colors-hue.component';
import { ColorsComponent } from './colors.component';
import { ColorBlockComponent } from './components/color-block.component';
import { ColorTitleComponent } from './components/color-title.component';
import { BgHexPipe } from './pipes/bg-hex.pipe';
import { ColorsChartsComponent } from './colors-charts/colors-charts.component';
import { ColorsMiscsComponent } from './colors-miscs/colors-miscs.component';

@NgModule({
  declarations: [
    ColorsComponent,
    ColorBlockComponent,
    ColorTitleComponent,
    BgHexPipe,
    ColorsHueComponent,
    ColorsGreyComponent,
    ColorsGradientsComponent,
    ColorsChartsComponent,
    ColorsMiscsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(generateRoutes(ColorsComponent)),
    DocPageModule,
    CopyToClipboardModule,
    DocExampleModule,
    DocMarkdownModule,
  ],
})
export class ColorsModule {}
