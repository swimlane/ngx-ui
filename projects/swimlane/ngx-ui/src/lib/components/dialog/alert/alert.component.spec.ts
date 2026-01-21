import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AlertComponent],
      providers: [IconRegistryService],
      imports: [FormsModule, HttpClientTestingModule, NoopAnimationsModule, InputModule, LongPressButtonModule],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.longPress = false;
    component.type = AlertTypes.Alert;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct text for actions', () => {
    const testConfirmBtnText = 'test_confirm_text';
    const testCancelBtnText = 'test_cancel_text';

    component.type = AlertTypes.Confirm;
    component.confirmButtonText = testConfirmBtnText;
    component.cancelButtonText = testCancelBtnText;
    fixture.detectChanges();

    const confirmBtn = fixture.debugElement.query(By.css('.ngx-dialog-footer button:first-child')).nativeElement;
    const cancelBtn = fixture.debugElement.query(By.css('.ngx-dialog-footer button:last-child')).nativeElement;
    expect(confirmBtn.textContent).toContain(testConfirmBtnText);
    expect(cancelBtn.textContent).toContain(testCancelBtnText);
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(AlertComponent);
      component = fixture.componentInstance;
      component.longPress = false;
    });

    it('should focus content if is !AlertTypes.Prompt', () => {
      const spy = vi.spyOn(component.dialogElm.nativeElement, 'focus');
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
      const okSpy = vi.spyOn(component.ok, 'emit');
      const hideSpy = vi.spyOn(component, 'hide');
      component.onOkClick();
      expect(okSpy).toHaveBeenCalled();
      expect(hideSpy).toHaveBeenCalled();
    });
  });

  describe('onCancelClick', () => {
    it('should emit cancel and hide', () => {
      const cancelSpy = vi.spyOn(component.cancel, 'emit');
      const hideSpy = vi.spyOn(component, 'hide');
      component.onCancelClick();
      expect(cancelSpy).toHaveBeenCalled();
      expect(hideSpy).toHaveBeenCalled();
    });
  });

  describe('onKeydown', () => {
    it('should emit ok and hide when longPress', () => {
      const okSpy = vi.spyOn(component.ok, 'emit');
      const hideSpy = vi.spyOn(component, 'hide');
      component.longPress = true;
      component.onKeydown();
      expect(okSpy).not.toHaveBeenCalled();
      expect(hideSpy).not.toHaveBeenCalled();
    });

    it('should not emit ok or hide when !longPress', () => {
      const okSpy = vi.spyOn(component.ok, 'emit');
      const hideSpy = vi.spyOn(component, 'hide');
      component.longPress = false;
      component.onKeydown();
      expect(okSpy).toHaveBeenCalled();
      expect(hideSpy).toHaveBeenCalled();
    });
  });
});
