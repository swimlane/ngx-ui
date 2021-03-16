import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decamelize',
})
export class DecamelizePipe implements PipeTransform {
  transform(input: unknown): string {
    if (!input) return '';

    const s = (input as { toString: () => string }).toString();
    return s.charAt(0).toUpperCase() + s.substr(1).replace(/[A-Z]/g, ' $&');
  }
}
