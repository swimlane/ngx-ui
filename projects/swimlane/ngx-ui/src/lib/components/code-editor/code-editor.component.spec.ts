import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { EditorView } from '@codemirror/view';

import { CodeEditorComponent } from './code-editor.component';

describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent;
  let fixture: ComponentFixture<CodeEditorComponent>;

  beforeAll(() => {
    if (typeof Range === 'undefined') {
      return;
    }
    const fakeRangeRect = () => new DOMRect(0, 0, 8, 16);
    Range.prototype.getBoundingClientRect = function (): DOMRect {
      return fakeRangeRect();
    };
    Range.prototype.getClientRects = function (): DOMRectList {
      const r = fakeRangeRect();
      const list = [r] as unknown as DOMRectList & {
        item: (i: number) => DOMRect | null;
      };
      list.item = i => (i === 0 ? r : null);
      return list;
    };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [OverlayModule],
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
    expect(component.instance).toBeInstanceOf(EditorView);
  });

  describe('value', () => {
    beforeEach(() => {
      component.value = 'test';
    });

    it('should write value', () => {
      const spy = vi.spyOn(component.change, 'emit');
      component.value = 'testing123';
      expect(spy).toHaveBeenCalledWith('testing123');
    });

    it('should not write value if it has not changed', () => {
      const spy = vi.spyOn(component.change, 'emit');
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
    it('should request a layout measure', () => {
      const spy = vi.spyOn(component.instance, 'requestMeasure');
      component.onVisible();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onChange', () => {
    it('should update value on instance change', () => {
      component.instance.dispatch({
        changes: { from: 0, to: component.instance.state.doc.length, insert: 'testing123' }
      });
      expect(component.value).toBe('testing123');
    });
  });

  describe('onBlur', () => {
    it('should emit value on blur', () => {
      component.instance.dispatch({
        changes: { from: 0, to: component.instance.state.doc.length, insert: 'testing123' }
      });
      const spy = vi.spyOn(component.blur, 'emit');
      component.onBlur();
      expect(spy).toHaveBeenCalledWith('testing123');
    });
  });

  describe('updateValue', () => {
    it('should update control value and emit change', () => {
      const spy = vi.spyOn(component.change, 'emit');
      component.updateValue('testing123');
      expect(spy).toHaveBeenCalledWith('testing123');
    });
  });

  describe('writeValue', () => {
    it('should write value to component and editor view', () => {
      const spy = vi.spyOn(component.instance, 'dispatch');
      component.writeValue('testing123');
      expect(spy).toHaveBeenCalled();
      expect(component.instance.state.doc.toString()).toBe('testing123');
    });

    it("should not write value if value hasn't changed", () => {
      const spy = vi.spyOn(component.instance, 'dispatch');
      component.value = 'testing123';
      component.writeValue('testing123');
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('registerOnChange', () => {
    it('should register new change callback', () => {
      const onChange = vi.fn();
      component.registerOnChange(onChange);
      component.value = 'testing123';
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith('testing123');
    });
  });

  describe('registerOnTouched', () => {
    it('should register new touched callback', () => {
      const onTouched = vi.fn(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(component.onTouchedCallback).toBe(onTouched);
      });

      component.registerOnTouched(onTouched);

      component.updateValue('testing123');
      expect(onTouched).toHaveBeenCalled();
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
    });

    it('should create an editor with autocomplete tokens', () => {
      expect(component.instance).toBeInstanceOf(EditorView);
      expect(component.autocompleteTokens).toEqual(['test', 'test2']);
    });
  });

  describe('setters', () => {
    it('should reconfigure line numbers', () => {
      const spy = vi.spyOn(component.instance, 'dispatch');
      component.setLineNumbers(true);
      expect(spy).toHaveBeenCalled();
    });

    it('should reconfigure theme', () => {
      const spy = vi.spyOn(component.instance, 'dispatch');
      component.setTheme('monokai');
      expect(component.theme).toBe('monokai');
      expect(spy).toHaveBeenCalled();
    });
  });
});
