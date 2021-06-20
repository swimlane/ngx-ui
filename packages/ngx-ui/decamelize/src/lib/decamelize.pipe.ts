import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decamelize',
})
export class DecamelizePipe implements PipeTransform {
  transform(value?: string): string {
    if (!value) return '';

    return (
      value.charAt(0).toUpperCase() + value.substr(1).replace(/[A-Z]/g, ' $&')
    );
  }
}
