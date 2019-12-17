import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeNodeComponent } from './tree-node.component';
import { TreeModule } from './tree.module';

describe('TreeNodeComponent', () => {
  let component: TreeNodeComponent;
  let fixture: ComponentFixture<TreeNodeComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TreeModule]
    });
    fixture = TestBed.createComponent(TreeNodeComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('select defaults to: selectNode', () => {
    expect(component.select).toEqual(component.selectNode);
  });

  it('ngOnChanges updates data property', () => {
    component.label = 'testLabel';
    component.children = [];
    component.model = {};

    component.ngOnChanges();
    expect(component.data.label).toEqual('testLabel');
    expect(component.data.children).toEqual([]);
    expect(component.data.model).toEqual({});
  });

  it('clicking expand to expand node emits expand event', () => {
    spyOn(component.expand, 'emit').and.callThrough();
    component.expandable = true;
    component.onExpandClick();

    expect(component.expanded).toBe(true);
    expect(component.expand.emit).toHaveBeenCalled();
  });

  it('clicking to collapse node emits collapse event', () => {
    spyOn(component.collapse, 'emit').and.callThrough();
    component.expandable = true;
    // click once to expand then again to collapse
    component.onExpandClick();
    component.onExpandClick();

    expect(component.expanded).toBe(false);
    expect(component.collapse.emit).toHaveBeenCalled();
  });

  it('onClick emits select event', () => {
    spyOn(component.selectNode, 'emit').and.callThrough();
    const event = {
      stopPropagation: () => {
        return;
      }
    };
    component.selectable = true;
    component.onClick(event);

    expect(component.selectNode.emit).toHaveBeenCalled();
  });

  describe('disabled and not selectable', () => {
    beforeEach(() => {
      component.selectable = false;
      component.disabled = true;
      component.expandable = false;
    });

    it('Expand click does not expand node when disabled', () => {
      component.onExpandClick();

      expect(component.expanded).toBeFalsy();
    });

    it('select click does not select node when disabled', () => {
      spyOn(component.selectNode, 'emit').and.callThrough();
      const event = {
        stopPropagation: () => {
          return;
        }
      };
      component.onClick(event);

      expect(component.selectNode.emit).not.toHaveBeenCalled();
    });
  });
});
