import { Pipe, PipeTransform } from '@angular/core';

/**
 * Map to Iteratble Pipe
 *
 * Example:
 *
 *  <div *ngFor="let keyValuePair of someObject | iterableMap">
 *    key {{keyValuePair.key}} and value {{keyValuePair.value}}
 *  </div>
 *
 * Concepts from:
 *    http://stackoverflow.com/questions/31490713/iterate-over-typescript-dictionary-in-angular-2
 *    https://webcake.co/object-properties-in-angular-2s-ngfor/
 *
 * See: https://github.com/angular/angular/issues/2246
 *
 */
@Pipe({ name: 'iterableMap' })
export class IterableMapPipe implements PipeTransform {
  transform(map) {
    const result = [];

    if (!map) {
      return result;
    }

    if(map.entries) {
      for (const [key, value] of map.entries()) {
        result.push({ key, value });
      }
    } else {
      for(const key in map) {
        result.push({ key, value: map[key] });
      }
    }

    return result;
  }
}
