import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'objectValues' })
export class ObjectValuesPipe implements PipeTransform {
  transform(object: object): Array<unknown> {
    return Object.values(object);
  }
}
