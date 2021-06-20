import { NgModule } from '@angular/core';
import { CamelToSnakePipe } from './camel-to-snake.pipe';

@NgModule({
  declarations: [CamelToSnakePipe],
  exports: [CamelToSnakePipe],
})
export class CamelToSnakeModule {}
