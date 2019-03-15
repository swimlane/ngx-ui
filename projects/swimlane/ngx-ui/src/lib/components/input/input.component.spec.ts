import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { FormsModule, FormControl } from '@angular/forms';
import { InputComponent } from './input.component';
import { InputTypes } from './input-types';
import { CommonModule } from '@angular/common';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  beforeEach(() => {
    const changeDetectorRefStub = { markForCheck: () => ({}) };
    const formControlStub = {};
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [InputComponent],
      imports: [ CommonModule, FormsModule ],
      providers: [
        { provide: ChangeDetectorRef, useValue: changeDetectorRefStub },
        { provide: FormControl, useValue: formControlStub }
      ]
    });
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('type defaults to: InputTypes.text', () => {
    expect(component.type).toEqual(InputTypes.text);
  });
  it('disabled defaults to: false', () => {
    expect(component.disabled).toEqual(false);
  });
  it('required defaults to: false', () => {
    expect(component.required).toEqual(false);
  });
  it('requiredIndicator defaults to: *', () => {
    expect(component.requiredIndicator).toEqual('*');
  });
  it('passwordToggleEnabled defaults to: false', () => {
    expect(component.passwordToggleEnabled).toEqual(false);
  });
  it('passwordTextVisible defaults to: false', () => {
    expect(component.passwordTextVisible).toEqual(false);
  });
  it('autoSelect defaults to: false', () => {
    expect(component.autoSelect).toEqual(false);
  });
  it('autofocus defaults to: false', () => {
    expect(component.autofocus).toEqual(false);
  });
  it('autocomplete defaults to: false', () => {
    expect(component.autocomplete).toEqual(false);
  });
  it('autocorrect defaults to: false', () => {
    expect(component.autocorrect).toEqual(false);
  });
  it('spellcheck defaults to: false', () => {
    expect(component.spellcheck).toEqual(false);
  });
  it('getHostCssClasses defaults to: ngx-input', () => {
    expect(component.getHostCssClasses).toEqual('ngx-input');
  });
  it('focused defaults to: false', () => {
    expect(component.focused).toEqual(false);
  });
});
