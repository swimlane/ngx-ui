import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppearanceModule } from '@swimlane/ngx-ui/appearance';
import { AutofocusModule } from '@swimlane/ngx-ui/autofocus';
import { AutosizeModule } from '@swimlane/ngx-ui/autosize';
import { IconModule } from '@swimlane/ngx-ui/icon';
import { InputModule } from '@swimlane/ngx-ui/input';
import { InputAttributeModule } from '@swimlane/ngx-ui/input-attribute';
import { LoadingModule } from '@swimlane/ngx-ui/loading';
import { MarginlessModule } from '@swimlane/ngx-ui/marginless';
import { NavMenuModule } from '@swimlane/ngx-ui/nav-menu';
import { SizeModule } from '@swimlane/ngx-ui/size';
import { TooltipModule } from '@swimlane/ngx-ui/tooltip';
import { DocNavigationComponent } from './doc-navigation.component';

@NgModule({
  declarations: [DocNavigationComponent],
  imports: [
    CommonModule,
    NavMenuModule,
    InputModule,
    InputAttributeModule,
    AutofocusModule,
    AutosizeModule,
    SizeModule,
    AppearanceModule,
    IconModule,
    MarginlessModule,
    TooltipModule,
    LoadingModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [DocNavigationComponent],
})
export class DocNavigationModule {}
