import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import * as CodeMirror from 'codemirror';

import { CodeEditorComponent } from './code-editor.component';

describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent;
  let fixture: ComponentFixture<CodeEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CodeEditorComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  describe('value', () => {
    beforeEach(() => {
      component.value = 'test';
    });

    it('should write value', () => {
      const spy = spyOn(component.change, 'emit');
      component.value = 'testing123';
      expect(spy).toHaveBeenCalledWith('testing123');
    });

    it('should not write value if it has not changed', () => {
      const spy = spyOn(component.change, 'emit');
      component.value = 'test';
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('cleanCode', () => {
    it('should trim code', () => {
      const input = ' if (true) { return false; }    ';
      const code = component.cleanCode(input);
      expect(code).toEqual(input.trim());
    });
  });

  describe('onVisible', () => {
    it('should refresh instance for sizing', () => {
      const spy = spyOn(component.instance, 'refresh');
      component.onVisible();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onKeyUp', () => {
    it('should call autocomplete', () => {
      const spy = spyOn(CodeMirror.commands as any, 'autocomplete');
      component.onKeyUp(component.instance, { keyCode: 219 } as any);
      expect(spy).toHaveBeenCalled();
    });

    it('should not call autocomplete', () => {
      const spy = spyOn(CodeMirror.commands as any, 'autocomplete');
      component.onKeyUp(component.instance, { keyCode: 63 } as any);
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onChange', () => {
    it('should update value on instance change', () => {
      component.instance.setValue('testing123');
      component.onChange();
      expect(component.value).toBe('testing123');
    });
  });

  describe('onBlur', () => {
    it('should emit value on blur', () => {
      const spy = spyOn(component.blur, 'emit');
      component.instance.setValue('testing123');
      component.onBlur();
      expect(spy).toHaveBeenCalledWith('testing123');
    });
  });

  describe('updateValue', () => {
    it('should update control value and emit change', () => {
      const spy = spyOn(component.change, 'emit');
      component.updateValue('testing123');
      expect(spy).toHaveBeenCalledWith('testing123');
    });
  });

  describe('writeValue', () => {
    it('should write value to component and codemirror instance', () => {
      const spy = spyOn(component.instance, 'setValue');
      component.writeValue('testing123');
      expect(spy).toHaveBeenCalledWith('testing123');
    });

    it("should not write value if value hasn't changed", () => {
      const spy = spyOn(component.instance, 'setValue');
      component.value = 'testing123';
      component.writeValue('testing123');
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('registerOnChange', () => {
    it('should register new change callback', done => {
      component.registerOnChange(v => {
        expect(v).toBe('testing123');
        done();
      });

      component.value = 'testing123';
    });
  });

  describe('registerOnTouched', () => {
    it('should register new touched callback', done => {
      const fn = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(component.onTouchedCallback).toBe(fn);
        done();
      };

      component.registerOnTouched(fn);

      component.updateValue('testing123');
    });
  });

  describe('autocomplete', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(CodeEditorComponent);
      component = fixture.componentInstance;
      component.autocompleteTokens = ['test', 'test2'];
      component.value = `
        console.log("test");
        console.log("test2");
      `;
      fixture.detectChanges();
      component.instance.setCursor(1);
    });

    it('should retrieve list of options', () => {
      const options = component.config.hintOptions.hint(component.instance);
      expect(options).toBeDefined();
    });
  });
});
