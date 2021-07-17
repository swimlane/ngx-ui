import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  DocExampleModule,
  DocMarkdownModule,
  DocPageModule,
  generateRoutes,
} from '@swimlane/ngx-doc';
import { TypographyAnchorsComponent } from './typography-anchors/typography-anchors.component';
import { TypographyCodeComponent } from './typography-code/typography-code.component';
import { TypographyCssHelpersComponent } from './typography-css-helpers/typography-css-helpers.component';
import { TypographyFontsComponent } from './typography-fonts/typography-fonts.component';
import { TypographyHeadingsComponent } from './typography-headings/typography-headings.component';
import { TypographyParagraphsComponent } from './typography-paragraphs/typography-paragraphs.component';
import { TypographyComponent } from './typography.component';

@NgModule({
  declarations: [
    TypographyComponent,
    TypographyFontsComponent,
    TypographyHeadingsComponent,
    TypographyCssHelpersComponent,
    TypographyAnchorsComponent,
    TypographyParagraphsComponent,
    TypographyCodeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(generateRoutes(TypographyComponent)),
    DocPageModule,
    DocMarkdownModule,
    DocExampleModule,
  ],
})
export class TypographyModule {}
