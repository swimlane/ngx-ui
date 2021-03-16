import { Pipe, PipeTransform } from '@angular/core';
import {
  filterByObject,
  filterByString,
  filterDefault,
} from '@swimlane/ngx-ui/utils/filters';
import { isNumber } from '@swimlane/ngx-ui/utils/is-number';

@Pipe({
  name: 'filterBy',
})
export class FilterByPipe implements PipeTransform {
  transform<TItems extends any[], TFilter = unknown>(
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
