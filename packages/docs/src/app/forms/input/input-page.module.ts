import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DocExampleModule, DocMarkdownModule, DocPageModule, generateRoutes } from '@swimlane/ngx-doc';
import { AppearanceModule } from '@swimlane/ngx-ui/appearance';
import { AutofocusModule } from '@swimlane/ngx-ui/autofocus';
import { InputModule } from '@swimlane/ngx-ui/input';
import { InputAttributeModule } from '@swimlane/ngx-ui/input-attribute';
import { SizeModule } from '@swimlane/ngx-ui/size';
import { InputPageComponent } from './input-page.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InputTextExampleComponent } from './input-text/examples/input-text-example/input-text-example.component';



@NgModule({
  declarations: [
    InputPageComponent,
    InputTextComponent,
    InputTextExampleComponent
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
    DocMarkdownModule
  ]
})
export class InputPageModule { }
