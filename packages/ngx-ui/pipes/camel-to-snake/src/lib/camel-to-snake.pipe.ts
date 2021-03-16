import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelToSnake',
})
export class CamelToSnakePipe implements PipeTransform {
  transform(input?: unknown): string {
    if (!input) return '';
    const str = (input as { toString: () => string }).toString();

    return str
      .split(/(?=[A-Z])/)
      .join('_')
      .toLowerCase();
  }
}
