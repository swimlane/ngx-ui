import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { FormsModule, FormControl } from '@angular/forms';
import { InputComponent } from './input.component';
import { InputTypes } from './input-types';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createHostComponentFactory, SpectatorWithHost } from '@netbasal/spectator';

describe('InputComponent', () => {
  let host: SpectatorWithHost<InputComponent>;
  const changeDetectorRefStub = { markForCheck: () => ({}) };
  const formControlStub = {};
  const createHost = createHostComponentFactory({
    component: InputComponent,
    schemas: [NO_ERRORS_SCHEMA],
    declarations: [InputComponent],
    imports: [CommonModule, FormsModule, BrowserAnimationsModule],
    providers: [
      { provide: ChangeDetectorRef, useValue: changeDetectorRefStub },
      { provide: FormControl, useValue: formControlStub }
    ]
  });

  describe('Defaults', () => {
    beforeEach(async () => {
      host = createHost(`<ngx-input></ngx-input>`);
      await host.hostFixture.detectChanges();
    });
    it('can load instance', () => {
      expect(host).toBeTruthy();
    });
    it('should add id', () => {
      expect(host.component.id).toEqual('input-2');
    });
    it('type defaults to: InputTypes.text', () => {
      expect(host.component).toHaveAttr({ attr: 'type', val: InputTypes.text });
    });
    it('disabled defaults to: false', () => {
      expect(host.component.disabled).toEqual(false);
    });
    it('required defaults to: false', () => {
      expect(host.component.required).toEqual(false);
    });
    it('requiredIndicator defaults to: *', () => {
      expect(host.component.requiredIndicator).toEqual('*');
    });
    it('passwordToggleEnabled defaults to: false', () => {
      expect(host.component.passwordToggleEnabled).toEqual(false);
    });
    it('passwordTextVisible defaults to: false', () => {
      expect(host.component.passwordTextVisible).toEqual(false);
    });
    it('autoSelect defaults to: false', () => {
      expect(host.component.autoSelect).toEqual(false);
    });
    it('autofocus defaults to: false', () => {
      expect(host.component.autofocus).toEqual(false);
    });
    it('autocomplete defaults to: false', () => {
      expect(host.component.autocomplete).toEqual(false);
    });
    it('autocorrect defaults to: false', () => {
      expect(host.component.autocorrect).toEqual(false);
    });
    it('spellcheck defaults to: false', () => {
      expect(host.component.spellcheck).toEqual(false);
    });
    it('getHostCssClasses defaults to: ngx-input', () => {
      expect(host.component.getHostCssClasses).toEqual('ngx-input');
    });
    it('focused defaults to: false', () => {
      expect(host.component.focused).toEqual(false);
    });
  });

  describe('Write values', () => {
    it('should not be empty after input entered', () => {
      host = createHost(`<ngx-input></ngx-input>`);
      expect(host.element.value).not.toBeDefined;
      host.component.writeValue('hello');
      host.hostFixture.whenStable().then(() => {
        host.hostFixture.detectChanges();
        expect(host.element.value).toBeTruthy();
        expect(host.element.value).toEqual('hello');
      });
    });

    it('should not be empty when the value set before view init', () => {
      host = createHost(`<ngx-input [ngModel]="'hello'"></ngx-input>`);
      host.hostFixture.whenStable().then(() => {
        host.hostFixture.detectChanges();
        expect(host.element.value).toBeTruthy();
        expect(host.element.value).toEqual('hello');
      });
    });
  });

  describe('Min / max', () => {
    it('should warn if value is shorter than min length', () => {
      host = createHost(`<ngx-input [ngModel]="'hi'" [minlength]="5"></ngx-input>`);
      host.hostFixture.whenStable().then(() => {
        host.hostFixture.detectChanges();
        expect(host.element.classList).toContain('ng-invalid');
      });
    });

    it('should warn if value is longer than max length', () => {
      host = createHost(`<ngx-input [ngModel]="'hello'" [maxlength]="3"></ngx-input>`);
      host.hostFixture.whenStable().then(() => {
        host.hostFixture.detectChanges();
        expect(host.element.classList).toContain('ng-invalid');
      });
    });

    it('should warn if numeric value is less than min', () => {
      host = createHost(`<ngx-input type="number" [ngModel]="0" [min]="5"></ngx-input>`);
      host.hostFixture.whenStable().then(() => {
        host.hostFixture.detectChanges();
        expect(host.element.classList).toContain('ng-invalid');
      });
    });

    it('should warn if numeric value is greater than max', () => {
      host = createHost(`<ngx-input type="number" [ngModel]="100" [max]="99"></ngx-input>`);
      host.hostFixture.whenStable().then(() => {
        host.hostFixture.detectChanges();
        expect(host.element.classList).toContain('ng-invalid');
      });
    });
  });

  describe('Input types', () => {
    it('should use textarea', () => {
      host = createHost(`<ngx-input type="textarea"></ngx-input>`);
      host.hostFixture.whenStable().then(() => {
        host.hostFixture.detectChanges();
        expect(host.query('input')).toBeFalsy();
      });
    });

    it('should toggle password visibility', () => {
      host = createHost(`<ngx-input type="password" [ngModel]="'1234'" [passwordToggleEnabled]="true"></ngx-input>`);
      host.hostFixture.whenStable().then(() => {
        host.hostFixture.detectChanges();
        expect(host.query('.icon-eye')).toBeTruthy();
        spyOn(host.component, 'togglePassword');
        host.element.querySelector('.icon-eye').click();
        expect(host.component.togglePassword).toHaveBeenCalled();
      });
    });

    it('should disable', () => {
      host = createHost(`<ngx-input [disabled]="true"></ngx-input>`);
      host.hostFixture.whenStable().then(() => {
        host.hostFixture.detectChanges();
        expect(host.query('input').classList).toContain('disabled');
      });
    });

    it('should ignore requiredIndicator when required is false', () => {
      // required is false, so requiredIndicator doesn't have effect
      host = createHost(`<ngx-input [requiredIndicator]="'***'"></ngx-input>`);
      expect(host.component.required).toBeFalsy();
      host.hostFixture.whenStable().then(() => {
        host.hostFixture.detectChanges();
        expect(host.element.querySelectorAll('.ngx-input-label span')[1].innerHTML).not.toEqual('***');
      });
    });

    it('should set requiredIndicator', () => {
      host = createHost(`<ngx-input [required]="true" [requiredIndicator]="'***'"></ngx-input>`);
      host.hostFixture.whenStable().then(() => {
        host.hostFixture.detectChanges();
        expect(host.element.querySelectorAll('.ngx-input-label span')[1].innerHTML).toEqual('***');
      });
    });

    it('should autoselect', () => {
      host = createHost(`<ngx-input [autoSelect]="true" [ngModel]="'hello'"></ngx-input>`);
      host.hostFixture.whenStable().then(() => {
        host.hostFixture.detectChanges();
        expect(host.component.focused).toBeFalsy();
        host.element.querySelector('input').select();
        expect(host.component.focused).toBeTruthy();
      });
    });
  });
});
