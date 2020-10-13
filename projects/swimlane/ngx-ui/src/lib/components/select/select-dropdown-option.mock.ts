import * as faker from 'faker/locale/en';

import { SelectDropdownOption } from './select-dropdown-option.interface';

export function selectDropdownOptionMock(option?: Partial<SelectDropdownOption>): SelectDropdownOption {
  return {
    name: faker.random.word(),
    value: faker.random.word(),
    ...option
  };
}
