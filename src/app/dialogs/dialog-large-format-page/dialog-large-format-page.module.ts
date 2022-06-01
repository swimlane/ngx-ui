import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule, DialogModule, DrawerModule, SectionModule, StepperModule, TabsModule } from '@swimlane/ngx-ui';
import { PrismModule } from '../../common/prism/prism.module';
import { ChildDrawerComponent } from './components/child-drawer.component';
import { NestedStepperComponent } from './components/nested-stepper.component';
import { NestedTabsComponent } from './components/nested-tabs.component';
import { ParentDrawerComponent } from './components/parent-drawer.component';
import { DialogLargeFormatDialogPageComponent } from './dialog-large-format-dialog-page.component';
import { DialogLargeFormatPageRoutingModule } from './dialog-large-format-page-routing.module';

@NgModule({
  declarations: [
    DialogLargeFormatDialogPageComponent,
    ParentDrawerComponent,
    ChildDrawerComponent,
    NestedStepperComponent,
    NestedTabsComponent
  ],
  imports: [
    CommonModule,
    DialogLargeFormatPageRoutingModule,
    StepperModule,
    DrawerModule,
    TabsModule,
    DialogModule,
    SectionModule,
    PrismModule,
    CardModule
  ]
})
export class DialogLargeFormatPageModule {}
