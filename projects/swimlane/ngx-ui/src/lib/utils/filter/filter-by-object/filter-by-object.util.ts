/* eslint-disable guard-for-in */
/* eslint-disable security/detect-object-injection */
import { filterByString } from '../filter-by-string/filter-by-string.util';
import { filterDefault } from '../filter-default/filter-default.util';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const filterByObject = (filter: any) => {
  return (value: unknown): boolean => {
    for (const key in filter) {
      // eslint-disable-next-line no-prototype-builtins
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
};
