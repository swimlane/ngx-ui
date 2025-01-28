import { Pipe, PipeTransform } from '@angular/core';

import { isNumber } from '../../utils/is-number/is-number.util';
import { filterByString } from '../../utils/filter/filter-by-string/filter-by-string.util';
import { filterByObject } from '../../utils/filter/filter-by-object/filter-by-object.util';
import { filterDefault } from '../../utils/filter/filter-default/filter-default.util';

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
  pure: false,
  standalone: false
})
export class FilterPipe implements PipeTransform {
  transform(array: any[], filter: unknown): any[] {
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
