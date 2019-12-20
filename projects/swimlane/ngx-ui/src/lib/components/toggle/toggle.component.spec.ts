import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToggleComponent],
      imports: [FormsModule]
    });

    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('disabled defaults to: false', () => {
    expect(component.disabled).toEqual(false);
    expect(component.getDisabled).toEqual('');
  });

  it('required defaults to: false', () => {
    expect(component.required).toEqual(false);
  });

  it('tabIndex defaults to: 0', () => {
    expect(component.tabIndex).toEqual(0);
  });

  it('required property can be set', () => {
    component.required = true;
    expect(component.required).toEqual(true);
  });

  it('tabIndex property can be set', () => {
    component.tabIndex = 1;
    expect(component.tabIndex).toEqual(1);
  });

  it('getHostCssClasses returns ngx-toggle', () => {
    expect(component.getHostCssClasses).toEqual('ngx-toggle');
  });

  it('getDisabled returns disabled on a disabled toggle', () => {
    component.disabled = true;
    expect(component.getDisabled).toEqual('disabled');
  });

  it('can register on change callback', done => {
    const changeCallback = () => {
      done();
    };

    component.registerOnChange(changeCallback);
    component.writeValue(true);
    expect(component.value).toEqual(true);
  });

  it('onBlur calls default callback if none have been registered', () => {
    component.onBlur();

    // value is unchanged
    expect(component.value).toEqual(false);
  });

  it('onBlur calls registered touch callback', done => {
    const touchCallback = () => {
      done();
    };

    component.registerOnTouched(touchCallback);
    component.onBlur();
  });

  it('toggle flips the toggle value', () => {
    expect(component.value).toEqual(false);
    component.toggle();
    expect(component.value).toEqual(true);
    component.toggle();
    expect(component.value).toEqual(false);
  });

  it('changing value triggers change emitter and callback to be called', () => {
    spyOn(component.change, 'emit');

    component.value = true;

    expect(component.value).toEqual(true);
    expect(component.change.emit).toHaveBeenCalled();
  });

  it('setting value to existing value does not trigger change emit', () => {
    spyOn(component.change, 'emit');

    component.value = false;

    expect(component.change.emit).not.toHaveBeenCalled();
  });

  it('writing value triggers change emitter and callback to be called', () => {
    spyOn(component.change, 'emit');

    component.writeValue(true);

    expect(component.value).toEqual(true);
    expect(component.change.emit).toHaveBeenCalled();
  });

  it('writing value to existing value does not trigger change emit', () => {
    spyOn(component.change, 'emit');

    component.writeValue(false);

    expect(component.change.emit).not.toHaveBeenCalled();
  });

  it('writing null or undefined value defaults it to false', () => {
    component.writeValue(null);

    expect(component.value).toEqual(false);
  });
});
