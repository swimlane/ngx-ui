import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'decamalize' })
export class DecamalizePipe implements PipeTransform {

  transform(input: any): string {
    if(!input) return '';
    const s = input.toString();
    return s.charAt(0).toUpperCase() + s.substr(1).replace(/[A-Z]/g, ' $&');
  }

}
