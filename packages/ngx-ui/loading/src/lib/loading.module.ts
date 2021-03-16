import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InjectionService } from '@swimlane/ngx-ui/injection';
import { LoadingBarComponent } from './loading-bar.component';
import { LoadingService } from './services';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingBarComponent],
  providers: [LoadingService, InjectionService],
  exports: [LoadingBarComponent]
})
export class LoadingModule {}
