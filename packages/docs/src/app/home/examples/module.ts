import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CounterComponent } from './component';
import { CounterFeature } from './slice';

@NgModule({
  imports: [StoreModule.forFeature(CounterFeature)],
  declarations: [CounterComponent],
})
export class CounterModule {}
