import { NgModule } from '@angular/core';

import { MemoizePipe } from './memoize.pipe';

@NgModule({
  declarations: [MemoizePipe],
  exports: [MemoizePipe]
})
export class MemoizeModule {}
