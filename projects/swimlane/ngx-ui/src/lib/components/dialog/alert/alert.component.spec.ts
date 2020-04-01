import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IconRegistryService } from '../../../services/icon-registry/icon-registry.service';

import { InputModule } from '../../input/input.module';
import { LongPressButtonModule } from '../../long-press/long-press-button.module';

import { AlertComponent } from './alert.component';
import { AlertTypes } from './alert-types.enum';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent],
      providers: [IconRegistryService],
      imports: [FormsModule, HttpClientTestingModule, NoopAnimationsModule, InputModule, LongPressButtonModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.longPress = false;
    component.type = AlertTypes.Alert;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AlertComponent);
      component = fixture.componentInstance;
      component.longPress = false;
    });

    it('should focus content if is !AlertTypes.Prompt', () => {
      const spy = spyOn(component.dialogElm.nativeElement, 'focus');
      component.type = AlertTypes.Alert;
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });

    it('should enable closeButton when longPress', () => {
      component.type = AlertTypes.Prompt;
      component.longPress = true;
      fixture.detectChanges();
      expect(component.closeButton).toBeTruthy();
    });
  });

  describe('onOkClick', () => {
    it('should emit ok and hide', () => {
      const okSpy = spyOn(component.ok, 'emit');
      const hideSpy = spyOn(component, 'hide');
      component.onOkClick();
      expect(okSpy).toHaveBeenCalled();
      expect(hideSpy).toHaveBeenCalled();
    });
  });

  describe('onCancelClick', () => {
    it('should emit cancel and hide', () => {
      const cancelSpy = spyOn(component.cancel, 'emit');
      const hideSpy = spyOn(component, 'hide');
      component.onCancelClick();
      expect(cancelSpy).toHaveBeenCalled();
      expect(hideSpy).toHaveBeenCalled();
    });
  });

  describe('onKeydown', () => {
    it('should emit ok and hide when longPress', () => {
      const okSpy = spyOn(component.ok, 'emit');
      const hideSpy = spyOn(component, 'hide');
      component.longPress = true;
      component.onKeydown();
      expect(okSpy).not.toHaveBeenCalled();
      expect(hideSpy).not.toHaveBeenCalled();
    });

    it('should not emit ok or hide when !longPress', () => {
      const okSpy = spyOn(component.ok, 'emit');
      const hideSpy = spyOn(component, 'hide');
      component.longPress = false;
      component.onKeydown();
      expect(okSpy).toHaveBeenCalled();
      expect(hideSpy).toHaveBeenCalled();
    });
  });
});
