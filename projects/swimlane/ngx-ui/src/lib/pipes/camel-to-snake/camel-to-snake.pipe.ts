import { Pipe, PipeTransform } from '@angular/core';
import { camelToSnake } from '../../utils/strings/camel-to-snake';

@Pipe({
  name: 'cameltosnake',
  standalone: false
})
export class CamelToSnakePipe implements PipeTransform {
  transform(input?: unknown): string {
    if (!input) return '';
    const str = input.toString();

    return camelToSnake(str);
  }
}
