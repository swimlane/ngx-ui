import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavbarItemComponent } from './navbar-item.component';

describe('Nav Item Component', () => {
  let component: NavbarItemComponent;
  let fixture: ComponentFixture<NavbarItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarItemComponent);
    component = fixture.componentInstance;

    component.index = 0;
    component.total = 1;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(isNaN(component.width)).toBeFalsy();
    expect(component.total).toEqual(1);
    expect(component.index).toEqual(0);
    expect(component).toBeTruthy();
  });

  it('setting component active changes active attribute to index', () => {
    component.setActive();
    expect(component.active).toEqual(component.index);
  });

  it('calling setActive when already active does not trigger change emitter', () => {
    component.setActive();
    expect(component.active).toEqual(component.index);

    const spy = spyOn(component.activeChange, 'emit');
    component.setActive();

    expect(spy).not.toHaveBeenCalled();
  });
});
