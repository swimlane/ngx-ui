import { Pipe, PipeTransform } from '@angular/core';
import {
  filterByObject,
  filterByString,
  filterDefault,
  isNumber,
} from '@swimlane/ngx-ui/utils';

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
})
export class FilterByPipe implements PipeTransform {
  transform<TItems extends [], TFilter = unknown>(
    array: TItems,
    filter: TFilter
  ): TItems {
    if (typeof filter === 'string') {
      if (isNumber(filter)) {
        return array.filter(filterDefault(filter)) as TItems;
      }

      return array.filter(filterByString(filter)) as TItems;
    }

    if (typeof filter === 'object') {
      return array.filter(
        filterByObject(filter as Record<string, unknown>)
      ) as TItems;
    }

    return array.filter(filterDefault(filter)) as TItems;
  }
}
