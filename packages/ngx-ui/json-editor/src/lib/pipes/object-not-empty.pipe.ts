import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectNotEmpty'
})
export class ObjectNotEmptyPipe implements PipeTransform {
  transform(value?: any | null): boolean {
    if (value == null) return false;
    return !!Object.keys(value).length;
  }
}
