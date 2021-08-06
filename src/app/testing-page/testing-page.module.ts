import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {
  ButtonModule,
  DateTimeModule,
  IconModule,
  InputModule,
  RadioButtonModule,
  SectionModule,
  SelectModule,
  ToggleModule
} from '@swimlane/ngx-ui';
import { PrismModule } from '../common/prism/prism.module';

import { TestingPageComponent } from './testing-page.component';

const routes: Routes = [
  {
    path: '',
    component: TestingPageComponent
  }
];

@NgModule({
  declarations: [TestingPageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    PrismModule,
    SectionModule,
    InputModule,
    SelectModule,
    ButtonModule,
    DateTimeModule,
    ToggleModule,
    IconModule,
    RadioButtonModule
  ]
})
export class TestingPageModule {}
