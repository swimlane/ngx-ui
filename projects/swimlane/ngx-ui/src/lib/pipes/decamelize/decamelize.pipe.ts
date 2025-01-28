import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decamelize',
  standalone: false
})
export class DecamelizePipe implements PipeTransform {
  transform(input: unknown): string {
    if (!input) return '';

    const s = input.toString();
    return s.charAt(0).toUpperCase() + s.substr(1).replace(/[A-Z]/g, ' $&');
  }
}
