import { SelectionList } from '../types/selection-list';

export const mockSelectionList: SelectionList = {
  active: true,
  id: 'randomId',
  title: '',
  children: [
    {
      id: '1',
      title: 'Selection List 1',
      children: [
        {
          id: '1-1',
          title: 'Child Selection List 1-1',
          children: [
            {
              id: '1-1-1',
              title: 'Child Selection List 1-1-1'
            }
          ]
        },
        {
          id: '1-2',
          title: 'Child Selection List 1-2'
        }
      ]
    }
  ]
};

export const mockParentMap = new Map<string, string>([
  ['1-1', '1'],
  ['1-2', '1'],
  ['1-1-1', '1-1']
]);

export const mockSelectionMap = new Map<string, SelectionList>([
  ['1', mockSelectionList.children[0]],
  ['1-1', mockSelectionList.children[0].children[0]],
  ['1-2', mockSelectionList.children[0].children[1]],
  ['1-1-1', mockSelectionList.children[0].children[0].children[0]]
]);
