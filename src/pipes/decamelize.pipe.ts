import { Pipe } from '@angular/core';

@Pipe({ name: 'decamalize' })
export class DecamalizePipe {
  transform(input: any): string {
    if(!input) return '';
    let s = input.toString();
    return s.charAt(0).toUpperCase() + s.substr(1).replace(/[A-Z]/g, ' $&');
  }
}
