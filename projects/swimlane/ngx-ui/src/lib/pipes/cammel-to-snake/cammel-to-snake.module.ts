import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CammelToSnakePipe } from './cammel-to-snake.pipe';

@NgModule({
  declarations: [CammelToSnakePipe],
  exports: [CammelToSnakePipe],
  imports: [CommonModule],
})
export class CammelToSnakeModule {}
