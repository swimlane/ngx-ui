import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InjectionService } from '../../services/injection/injection.service';
import { LoadingComponent } from './loading.component';

@NgModule({
  declarations: [LoadingComponent],
  providers: [InjectionService],
  exports: [LoadingComponent],
  imports: [CommonModule]
})
export class LoadingModule {}
