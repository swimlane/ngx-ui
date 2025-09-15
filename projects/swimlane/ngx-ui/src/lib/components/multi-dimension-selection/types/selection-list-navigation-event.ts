import { SelectionList } from './selection-list';

export interface SelectionListNavigationEvent {
  active: boolean;
  listId: string;
  selectionList: SelectionList;
}
