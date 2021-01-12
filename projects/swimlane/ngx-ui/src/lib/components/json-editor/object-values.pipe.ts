import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'objectValues' })
export class ObjectValuesPipe implements PipeTransform {
  transform(object: Record<string, unknown>): unknown[] {
    return Object.values(object);
  }
}
