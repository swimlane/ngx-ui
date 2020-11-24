import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { PlusMenuComponent } from './plus-menu.component';

@NgModule({
  imports: [CommonModule, IconModule],
  exports: [PlusMenuComponent],
  declarations: [PlusMenuComponent]
})
export class PlusMenuModule {}
