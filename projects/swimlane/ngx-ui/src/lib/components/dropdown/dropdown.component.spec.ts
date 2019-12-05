import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DropdownComponent } from './dropdown.component';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';

@Component({
  selector: `ngx-test-host-component`,
  template: `
    <ngx-dropdown showCaret>
      <ngx-dropdown-toggle *ngIf="hasToggler$ | async">Button</ngx-dropdown-toggle>
      <ngx-dropdown-menu class="pull-right">
        <ul><li><a>...</a></li></ul>
      </ngx-dropdown-menu>
    </ngx-dropdown>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestHostComponent {
  @ViewChild(DropdownComponent, { static: false })
  readonly dropdown: DropdownComponent;

  readonly hasToggler$ = new BehaviorSubject(true);
}

describe('DropdownComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DropdownComponent,
        DropdownMenuDirective,
        DropdownToggleDirective,
        TestHostComponent,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle on click', () => {
    const spy = spyOn(component.dropdown, 'onToggleClick');
    component.dropdown.dropdownToggle.onClick({ preventDefault: () => undefined } as any);
    expect(spy).toHaveBeenCalled();
  });

  describe('onDocumentClick', () => {
    it('should close on outside click', () => {
      component.dropdown.open = true;
      const el = document.createElement('div');
      component.dropdown.onDocumentClick({ target: el } as any);
      expect(component.dropdown.open).toBe(false);
    });

    it('should not close on outside click', () => {
      component.dropdown.open = true;
      component.dropdown.closeOnOutsideClick = false;
      const el = document.createElement('div');
      component.dropdown.onDocumentClick({ target: el } as any);
      expect(component.dropdown.open).toBe(true);
    });

    it('should close on on menu click', () => {
      component.dropdown.open = true;
      component.dropdown.closeOnClick = false;
      const el = document.createElement('div');
      component.dropdown.onDocumentClick({ target: el } as any);
      expect(component.dropdown.open).toBe(false);
    });

    it('should not close on menu click', () => {
      component.dropdown.open = true;
      component.dropdown.closeOnClick = false;
      const el = component.dropdown.dropdownMenu.element.firstChild;
      component.dropdown.onDocumentClick({ target: el } as any);
      expect(component.dropdown.open).toBe(true);
    });

    it('should call document listener on close', () => {
      component.dropdown.open = false;
      component.dropdown.closeOnClick = false;
      component.dropdown.onToggleClick(undefined);
      const el = document.createElement('div');
      component.dropdown.onDocumentClick({ target: el } as any);
      expect(component.dropdown.open).toBe(false);
    });
  });

  describe('onToggleClick', () => {
    it('should toggle menu to open', () => {
      component.dropdown.onToggleClick(undefined);
      expect(component.dropdown.open).toBe(true);
    });

    it('should toggle menu to close', () => {
      component.dropdown.onToggleClick(undefined);
      component.dropdown.onToggleClick(undefined);
      expect(component.dropdown.open).toBe(false);
    });
  });

  describe('DropdownToggleDirective', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TestHostComponent);
      component = fixture.componentInstance;
      component.hasToggler$.next(false);
      fixture.detectChanges();
    });

    it('should not have a toggler', () => {
      expect(component.dropdown.dropdownToggle).toBeFalsy();
    });
  });
});
