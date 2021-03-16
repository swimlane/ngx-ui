import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectValues',
})
export class ObjectValuesPipe implements PipeTransform {
  transform(value: Record<string, any>): any[] {
    return Object.values(value);
  }
}
