import type { MockInstance } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleComponent } from './toggle.component';
import { ToggleModule } from './toggle.module';

describe('ToggleComponent', () => {
  let component: ToggleComponent;
  let fixture: ComponentFixture<ToggleComponent>;
  let changeSpy: MockInstance<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToggleModule]
    });

    fixture = TestBed.createComponent(ToggleComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    const change = { onChange: () => undefined };
    changeSpy = vi.spyOn(change, 'onChange');
    component.registerOnChange(change.onChange);
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

  it('showIcons defaults to: true', () => {
    expect(component.showIcons).toEqual(true);
  });

  it('tabIndex defaults to: 0', () => {
    expect(component.tabIndex).toEqual(0);
  });

  it('required property can be set', () => {
    component.required = true;
    expect(component.required).toEqual(true);
  });

  it('showIcons property can be set', () => {
    component.showIcons = false;
    expect(component.showIcons).toEqual(false);
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

  it('can register on change callback', () => {
    component.writeValue(true);
    expect(component.value).toEqual(true);
    expect(changeSpy).toHaveBeenCalledTimes(1);
  });

  it('onBlur calls default callback if none have been registered', () => {
    component.onBlur();

    // value is unchanged
    expect(component.value).toEqual(false);
  });

  it('onBlur calls registered touch callback', async () => {
    const touchCallback = () => {
      expect((component as any).onTouchedCallback).toBe(touchCallback);
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

  it('changing value triggers change callback to be called', () => {
    component.value = true;

    expect(component.value).toEqual(true);
    expect(changeSpy).toHaveBeenCalledTimes(1);
  });

  it('setting value to existing value does not trigger change', () => {
    component.value = false;

    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('writing value triggers change callback to be called', () => {
    component.writeValue(true);

    expect(component.value).toEqual(true);
    expect(changeSpy).toHaveBeenCalledTimes(1);
  });

  it('writing value to existing value does not trigger change', () => {
    component.writeValue(false);

    expect(changeSpy).not.toHaveBeenCalled();
  });

  it('writing null or undefined value defaults it to false', () => {
    component.writeValue(null);

    expect(component.value).toEqual(false);
  });

  it('emitChange should emit the change event', () => {
    vi.spyOn(component.change, 'emit');

    component['emitChange']();

    expect(component.change.emit).toHaveBeenCalled();
  });
});
