import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CamelToSnakePipe } from './camel-to-snake.pipe';

@NgModule({
  declarations: [CamelToSnakePipe],
  exports: [CamelToSnakePipe],
  imports: [CommonModule]
})
export class CamelToSnakeModule {}
