import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonTogglePageComponent } from './button-toggle-page.component';
import { ButtonTogglePageRoutingModule } from './button-toggle-routing.module';
import { PrismModule } from '../../common/prism/prism.module';
import { ButtonToggleModule, SectionModule, TabsModule } from '@swimlane/ngx-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ButtonTogglePageComponent],
  imports: [
    CommonModule,
    PrismModule,
    SectionModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule,
    ButtonToggleModule,
    ButtonTogglePageRoutingModule
  ]
})
export class ButtonTogglePageModule {}
