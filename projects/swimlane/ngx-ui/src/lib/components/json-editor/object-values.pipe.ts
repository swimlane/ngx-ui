import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'objectValues',
  standalone: false
})
export class ObjectValuesPipe implements PipeTransform {
  transform(object: any): unknown[] {
    return Object.values(object);
  }
}
