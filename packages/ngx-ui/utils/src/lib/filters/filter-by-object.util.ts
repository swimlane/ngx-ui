import { filterDefault } from './filter-by-default.util';
import { filterByString } from './filter-by-string.util';

export function filterByObject<
  TFilter extends Record<string, unknown>,
  TValue = TFilter
>(filter: TFilter) {
  return (value: TValue) => {
    for (const key of Object.keys(filter)) {
      // eslint-disable-next-line no-prototype-builtins,@typescript-eslint/no-explicit-any
      if (!(value as any).hasOwnProperty(key as unknown as keyof TValue)) {
        return false;
      }

      let isMatching: boolean;
      const valueAtKey = value[key as unknown as keyof TValue];

      if (typeof valueAtKey === 'string') {
        isMatching = filterByString(filter[key] as string)(valueAtKey);
      } else if (typeof valueAtKey === 'object') {
        isMatching = filterByObject(filter[key] as Record<string, unknown>)(
          valueAtKey as unknown as Record<string, unknown>
        );
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        isMatching = filterDefault(filter[key])(valueAtKey as any);
      }

      if (!isMatching) {
        return false;
      }
    }

    return true;
  };
}
