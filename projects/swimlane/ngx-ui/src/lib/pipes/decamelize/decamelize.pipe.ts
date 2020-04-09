import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decamelize',
})
export class DecamelizePipe implements PipeTransform {
  transform(input: any): string {
    if (!input) return '';

    const s = input.toString();
    return s.charAt(0).toUpperCase() + s.substr(1).replace(/[A-Z]/g, ' $&');
  }
}
