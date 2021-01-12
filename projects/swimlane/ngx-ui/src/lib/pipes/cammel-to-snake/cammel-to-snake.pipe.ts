import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cammeltosnake' })
export class CammelToSnakePipe implements PipeTransform {
  transform(input?: unknown): string {
    if (!input) return '';
    const str = input.toString();

    return str
      .split(/(?=[A-Z])/)
      .join('_')
      .toLowerCase();
  }
}
