import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InjectionService } from '../../services';
import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';

@NgModule({
  declarations: [LoadingComponent],
  providers: [LoadingService, InjectionService],
  exports: [LoadingComponent],
  imports: [CommonModule],
  entryComponents: [LoadingComponent]
})
export class LoadingModule { }
