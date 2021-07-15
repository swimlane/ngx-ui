import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectionService } from '@swimlane/ngx-ui/common';
import { LoadingComponent } from './loading.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingComponent],
  exports: [LoadingComponent],
  providers: [InjectionService],
})
export class LoadingModule {}
