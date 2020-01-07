import { Pipe, PipeTransform } from '@angular/core';

import { isNumber, filterByString, filterDefault, filterByObject } from '../../utils';

/**
 * Filter Pipe
 * A pipe like the old-school ng1 pipe. Use this with
 * moderation since it has performance issues.
 *
 * References:
 *  - https://github.com/VadimDez/ng2-filter-pipe
 *  - https://angular.io/docs/ts/latest/guide/pipes.html
 *
 * Example:
 *
 *    <input type="text" [(ngModel)]="stringFilter">
 *    <ul>
 *      <li *ngFor="let item of array | filterBy: stringFilter">
 *        {{ item }}
 *      </li>
 *    </ul>
 *
 */
@Pipe({
  name: 'filterBy',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(array: any[], filter: any): any[] {
    if (typeof filter === 'string') {
      if (isNumber(filter)) {
        return array.filter(filterDefault(filter));
      }

      return array.filter(filterByString(filter));
    }

    if (typeof filter === 'object') {
      return array.filter(filterByObject(filter));
    }

    return array.filter(filterDefault(filter));
  }
}
