import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelToSnake',
})
export class CamelToSnakePipe implements PipeTransform {
  transform(value?: string): string {
    if (!value) return '';

    return value
      .split(/(?=[A-Z])/)
      .join('_')
      .toLowerCase();
  }
}
