import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { ToolbarFixtureComponent } from './fixtures/toolbar.fixture';
import { ToolbarModule } from './toolbar.module';

describe('ToolbarComponent', () => {
  let component1: ToolbarComponent;
  let component2: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarFixtureComponent>;

  beforeEach(done => {
    TestBed.configureTestingModule({
      declarations: [ToolbarFixtureComponent],
      imports: [ToolbarModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ToolbarFixtureComponent);
    component1 = fixture.componentInstance.toolbar1;
    component2 = fixture.componentInstance.toolbar2;
    fixture.autoDetectChanges();
    fixture.whenStable().then(() => done());
  });

  it('can load instance', () => {
    expect(component1).toBeTruthy();
    expect(component2).toBeTruthy();
  });

  it('title gets replaced by main title attribute', () => {
    // this component has title property set
    expect(component2.mainTitle).toEqual(component2.title);
  });

  it('toolbar renders toolbar items based on menu config', () => {
    expect(component1.toolbarItems.length).toEqual(3);

    const toolbarEls = document.querySelectorAll('.ngx-toolbar-menu > li > button');
    expect(toolbarEls.length).toEqual(3);
  });

  it('toolbar renders dropdown items based on menu config', () => {
    expect(component1.dropdownItems.length).toEqual(1);

    const toolbarEls = document.querySelectorAll('.ngx-toolbar-menu > li > ngx-dropdown');
    expect(toolbarEls.length).toEqual(1);
  });

  it('clicking on a menu item that has a click function triggers it', () => {
    const menuItem = component1.toolbarItems[0];
    spyOn(menuItem, 'click');

    const menuItemEl: HTMLButtonElement = document.querySelector('.ngx-toolbar-menu > li > button');
    menuItemEl.click();
    expect(menuItem.click).toHaveBeenCalled();
  });

  it('item with disabled property in menu config is rendered as disabled', () => {
    const menuItemEl: HTMLButtonElement = document.querySelector('.ngx-toolbar-menu > li:nth-child(3) > button');

    expect(menuItemEl.getAttribute('disabled')).toEqual('');
  });
});
