import { NgModule } from '@angular/core';
import { JsonTreePipe } from './json-tree.pipe';

@NgModule({
  declarations: [JsonTreePipe],
  exports: [JsonTreePipe],
})
export class JsonTreeModule {}
