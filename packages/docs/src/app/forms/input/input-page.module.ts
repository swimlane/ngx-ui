import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DocExampleModule,
  DocMarkdownModule,
  DocPageModule,
  generateRoutes,
} from '@swimlane/ngx-doc';
import { AppearanceModule } from '@swimlane/ngx-ui/appearance';
import { AutofocusModule } from '@swimlane/ngx-ui/autofocus';
import { InputModule } from '@swimlane/ngx-ui/input';
import { InputAttributeModule } from '@swimlane/ngx-ui/input-attribute';
import { SizeModule } from '@swimlane/ngx-ui/size';
import { InputPageComponent } from './input-page.component';
import { InputTextExampleComponent } from './input-text/examples/input-text-example/input-text-example.component';
import { InputTextNoLabelExampleComponent } from './input-text/examples/input-text-no-label-example/input-text-no-label-example.component';
import { InputTextPrefixSuffixExampleComponent } from './input-text/examples/input-text-prefix-suffix-example/input-text-prefix-suffix-example.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputTextDisabledExampleComponent } from './input-text/examples/input-text-disabled-example/input-text-disabled-example.component';
import { InputTextUnlockableExampleComponent } from './input-text/examples/input-text-unlockable-example/input-text-unlockable-example.component';
import { InputTextRequiredExampleComponent } from './input-text/examples/input-text-required-example/input-text-required-example.component';
import { InputTextDefaultValueExampleComponent } from './input-text/examples/input-text-default-value-example/input-text-default-value-example.component';

@NgModule({
  declarations: [
    InputPageComponent,
    InputTextComponent,
    InputTextExampleComponent,
    InputTextNoLabelExampleComponent,
    InputTextPrefixSuffixExampleComponent,
    InputTextDisabledExampleComponent,
    InputTextUnlockableExampleComponent,
    InputTextRequiredExampleComponent,
    InputTextDefaultValueExampleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(generateRoutes(InputPageComponent)),
    DocPageModule,
    DocExampleModule,
    InputModule,
    InputAttributeModule,
    AutofocusModule,
    FormsModule,
    SizeModule,
    AppearanceModule,
    DocMarkdownModule,
  ],
})
export class InputPageModule {}
