import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TabsComponent } from './tabs.component';
import { TabsFixtureComponent } from './fixtures/tabs.fixture';
fdescribe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsFixtureComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TabsComponent, TabsFixtureComponent]
    });
    fixture = TestBed.createComponent(TabsFixtureComponent);
    component = fixture.componentInstance.tabsComponent;
    fixture.autoDetectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('begins with the first tab set to active by default', () => {
    expect(component.index).toBe(0);
  });

  it('select defaults to: selectTab', () => {
    expect(component.select).toEqual(component.selectTab);
  });

  describe('next', () => {
    it('makes expected calls', () => {
      spyOn(component, 'move');
      component.next();
      expect(component.move).toHaveBeenCalled();
      expect(component.index).toBe(1);
    });
  });

  describe('prev', () => {
    it('makes expected calls', () => {
      spyOn(component, 'move');
      component.prev();
      expect(component.move).toHaveBeenCalled();
    });
  });
});
