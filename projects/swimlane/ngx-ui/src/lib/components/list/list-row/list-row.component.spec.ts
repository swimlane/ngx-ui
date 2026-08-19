import { ListRowComponent } from './list-row.component';
import { ListColumnComponent } from '../list-column/list-column.component';
import { LIST_DEPTH_KEY } from '../models/list-item.model';

describe('ListRowComponent', () => {
  let component: ListRowComponent;

  const columnWithAlign = (align?: 'left' | 'center' | 'right'): ListColumnComponent =>
    ({ align: align ?? 'left' }) as ListColumnComponent;

  beforeEach(() => {
    component = new ListRowComponent();
    component.nestIndent = 20;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('leaves top level rows at the base margin', () => {
    component.data = { id: 'a', [LIST_DEPTH_KEY]: 0 };

    expect(component.depth).toBe(0);
    expect(component.marginLeftPx).toBe(16);
  });

  it('steps the whole row card in by one indent per depth', () => {
    component.data = { id: 'a', [LIST_DEPTH_KEY]: 2 };

    expect(component.marginLeftPx).toBe(56);
  });

  describe('getCellAlign', () => {
    it('honours the column align when the list is flat', () => {
      component.nested = false;

      expect(component.getCellAlign(0, columnWithAlign('right'))).toBe('right');
      expect(component.getCellAlign(1, columnWithAlign())).toBe('left');
    });

    it('keeps the tree column left aligned but centers data columns when staggered', () => {
      component.nested = true;
      component.indentColumn = 1;

      expect(component.getCellAlign(1, columnWithAlign('right'))).toBe('left');
      expect(component.getCellAlign(0, columnWithAlign())).toBe('center');
      expect(component.getCellAlign(2, columnWithAlign())).toBe('center');
    });

    it('honours each column align when nested rows keep their columns aligned', () => {
      component.nested = true;
      component.nestMode = 'aligned';
      component.indentColumn = 0;

      expect(component.getCellAlign(0, columnWithAlign())).toBe('left');
      expect(component.getCellAlign(1, columnWithAlign('right'))).toBe('right');
    });
  });

  describe('rowColumnLayout', () => {
    beforeEach(() => {
      component.columnLayout = { display: 'grid', gap: '1rem', gridTemplateColumns: '16rem 8rem 1fr' };
    });

    it('passes the layout straight through in stagger mode', () => {
      component.nestMode = 'stagger';
      component.data = { id: 'a', [LIST_DEPTH_KEY]: 2 };

      expect(component.rowColumnLayout).toBe(component.columnLayout);
    });

    it('gives back the indent from the first column so later columns stay put', () => {
      component.nestMode = 'aligned';
      component.data = { id: 'a', [LIST_DEPTH_KEY]: 2 };

      expect(component.rowColumnLayout.gridTemplateColumns).toBe('calc(16rem - 40px) 8rem 1fr');
    });

    it('reuses the cached object while the depth and layout are unchanged', () => {
      component.nestMode = 'aligned';
      component.data = { id: 'a', [LIST_DEPTH_KEY]: 1 };

      expect(component.rowColumnLayout).toBe(component.rowColumnLayout);
    });

    it('leaves top level rows and unshrinkable layouts untouched', () => {
      component.nestMode = 'aligned';
      component.data = { id: 'a', [LIST_DEPTH_KEY]: 0 };
      expect(component.rowColumnLayout).toBe(component.columnLayout);

      component.data = { id: 'a', [LIST_DEPTH_KEY]: 2 };
      component.columnLayout = { gridTemplateColumns: '2fr 1fr' };
      expect(component.rowColumnLayout).toBe(component.columnLayout);
    });
  });

  it('labels the checkbox with the row name and forwards toggles', () => {
    const onCheckedChange = vi.fn();
    component.data = { id: 'a', name: 'Persistence' };
    component.index = 3;
    component.onCheckedChange = onCheckedChange;

    expect(component.checkboxAriaLabel).toBe('Persistence');

    component.onCheckboxChange(true);

    expect(onCheckedChange).toHaveBeenCalledWith(component.data, 3, true);
  });
});
