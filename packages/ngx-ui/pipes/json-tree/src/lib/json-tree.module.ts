import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonTreePipe } from './json-tree.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [JsonTreePipe],
  exports: [JsonTreePipe]
})
export class JsonTreeModule {}
