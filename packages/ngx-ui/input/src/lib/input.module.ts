import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutosizeInputModule } from '@swimlane/ngx-ui/directives/autosize-input';
import { LongPressModule } from '@swimlane/ngx-ui/directives/long-press';
import { TooltipModule } from '@swimlane/ngx-ui/tooltip';
import { InputAutosizeDirective, InputHintDirective } from './directives';
import { InputPrefixComponent } from './input-prefix/input-prefix.component';
import { InputSuffixComponent } from './input-suffix/input-suffix.component';
import { InputComponent } from './input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LongPressModule,
    AutosizeInputModule,
    TooltipModule,
  ],
  declarations: [
    InputAutosizeDirective,
    InputHintDirective,
    InputPrefixComponent,
    InputSuffixComponent,
    InputComponent,
  ],
  exports: [
    InputAutosizeDirective,
    InputHintDirective,
    InputPrefixComponent,
    InputSuffixComponent,
    InputComponent,
  ],
})
export class InputModule {}
