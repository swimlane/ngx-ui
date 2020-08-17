import { filterByString } from '../filter-by-string/filter-by-string.util';
import { filterDefault } from '../filter-default/filter-default.util';

export function filterByObject(filter: any) {
  return (value: any) => {
    for (const key in filter) {
      if (!value.hasOwnProperty(key)) {
        return false;
      }

      let isMatching: boolean;

      if (typeof value[key] === 'string') {
        isMatching = filterByString(filter[key])(value[key]);
      } else if (typeof value[key] === 'object') {
        isMatching = filterByObject(filter[key])(value[key]);
      } else {
        isMatching = filterDefault(filter[key])(value[key]);
      }

      if (!isMatching) {
        return false;
      }
    }

    return true;
  };
}
