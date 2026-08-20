import { ListRowId } from './list-item.model';

export interface ListSelectionEvent {
  selectedIds: ListRowId[];
  row?: Record<string, unknown>;
  selected?: boolean;
}
