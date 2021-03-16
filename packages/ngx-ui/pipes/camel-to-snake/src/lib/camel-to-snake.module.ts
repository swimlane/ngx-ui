import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamelToSnakePipe } from './camel-to-snake.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [CamelToSnakePipe],
  exports: [CamelToSnakePipe],
})
export class CamelToSnakeModule {}
