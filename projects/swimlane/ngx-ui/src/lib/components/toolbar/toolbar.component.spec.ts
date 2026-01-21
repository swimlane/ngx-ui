import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarComponent } from './toolbar.component';
import { ToolbarFixtureComponent } from './fixtures/toolbar.fixture';

describe('ToolbarComponent', () => {
  let component1: ToolbarComponent;
  let component2: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarFixtureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToolbarFixtureComponent],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ToolbarFixtureComponent);
    component1 = fixture.componentInstance.toolbar1;
    component2 = fixture.componentInstance.toolbar2;
    fixture.autoDetectChanges();
    await fixture.whenStable().then(() => {});
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
    const spy = vi.spyOn(component1.toolbarItems[0], 'click');
    const menuItemEl: HTMLButtonElement = document.querySelector('.ngx-toolbar-menu > li > button');

    menuItemEl.click();
    expect(spy).toHaveBeenCalled();
  });

  it('clicking on a menu item that has no click function is handled gracefully', () => {
    const menuItem = component1.toolbarItems[2];
    expect(menuItem.click).toBeUndefined();

    vi.spyOn(component1, 'onMenuClicked');

    const menuItemEl: HTMLButtonElement = document.querySelector('.ngx-toolbar-menu > li:nth-child(2) > button');
    menuItemEl.click();

    expect(component1.onMenuClicked).toHaveBeenCalled();
  });

  it('item with disabled property in menu config is rendered as disabled', () => {
    const menuItemEl: HTMLButtonElement = document.querySelector('.ngx-toolbar-menu > li:nth-child(3) > button');

    expect(menuItemEl.getAttribute('disabled')).toEqual('');
  });
});
