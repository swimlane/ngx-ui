import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputAutosizeModule } from '@swimlane/ngx-ui/input-autosize';
import { LongPressModule } from '@swimlane/ngx-ui/long-press';
import { TooltipModule } from '@swimlane/ngx-ui/tooltip';
import { AutosizeInputDirective } from './autosize/autosize.directive';
import { InputHintDirective } from './input-hint/input-hint.directive';
import { InputPrefixDirective } from './input-prefix/input-prefix.directive';
import { InputSuffixDirective } from './input-suffix/input-suffix.directive';
import { InputComponent } from './input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputAutosizeModule,
    TooltipModule,
    LongPressModule,
  ],
  declarations: [
    InputHintDirective,
    InputPrefixDirective,
    InputSuffixDirective,
    InputComponent,
    AutosizeInputDirective,
  ],
  exports: [
    InputHintDirective,
    InputPrefixDirective,
    InputSuffixDirective,
    InputComponent,
  ],
})
export class InputModule {}
