import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from '@swimlane/ngx-ui/checkbox';
import { TooltipModule } from '@swimlane/ngx-ui/tooltip';
import { CardAvatarComponent } from './card-avatar/card-avatar.component';
import { CardFooterComponent } from './card-footer/card-footer.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { CardPlaceholderComponent } from './card-placeholder/card-placeholder.component';
import { CardComponent } from './card.component';
import {
  CardBodyDirective,
  CardSectionDirective,
  CardSubtitleDirective,
  CardTagDirective,
  CardTitleDirective,
} from './card.directive';

@NgModule({
  imports: [CommonModule, CheckboxModule, TooltipModule, FormsModule],
  declarations: [
    CardBodyDirective,
    CardTagDirective,
    CardTitleDirective,
    CardSubtitleDirective,
    CardSectionDirective,
    CardHeaderComponent,
    CardFooterComponent,
    CardPlaceholderComponent,
    CardAvatarComponent,
    CardComponent,
  ],
  exports: [
    CardBodyDirective,
    CardTagDirective,
    CardTitleDirective,
    CardSubtitleDirective,
    CardSectionDirective,
    CardHeaderComponent,
    CardFooterComponent,
    CardPlaceholderComponent,
    CardAvatarComponent,
    CardComponent,
  ],
})
export class CardModule {}
