import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconModule } from '../icon/icon.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { CardComponent } from './card.component';
import { CardHeaderComponent } from './card-header.component';
import {
  CardBodyDirective,
  CardTagDirective,
  CardTitleDirective,
  CardSubtitleDirective,
  CardSectionDirective
} from './card';
import { CardAvatarComponent } from './card-avatar/card-avatar.component';
import { CardPlaceholderComponent } from './card-placeholder/card-placeholder.component';
import { CardFooterComponent } from './card-footer.component';
@NgModule({
  declarations: [
    CardComponent,
    CardHeaderComponent,
    CardBodyDirective,
    CardTagDirective,
    CardTitleDirective,
    CardSubtitleDirective,
    CardSectionDirective,
    CardAvatarComponent,
    CardFooterComponent,
    CardPlaceholderComponent
  ],
  exports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyDirective,
    CardTagDirective,
    CardTitleDirective,
    CardSubtitleDirective,
    CardSectionDirective,
    CardAvatarComponent,
    CardFooterComponent,
    CardPlaceholderComponent
  ],
  imports: [CommonModule, FormsModule, IconModule, TooltipModule, CheckboxModule]
})
export class CardModule {}
