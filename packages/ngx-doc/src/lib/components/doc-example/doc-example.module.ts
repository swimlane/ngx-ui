import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DocExampleComponent } from './doc-example.component';

@NgModule({
  declarations: [DocExampleComponent],
  imports: [CommonModule],
  exports: [DocExampleComponent],
})
export class DocExampleModule {}
