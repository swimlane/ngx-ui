/* eslint-disable security/detect-non-literal-fs-filename */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogFormat } from '@swimlane/ngx-ui/components/dialog/dialog-format.enum';

import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DialogComponent],
      imports: [NoopAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('visibleState', () => {
    it('should be active', () => {
      component.visible = true;
      expect(component.visibleState).toEqual('active');
    });

    it('should be inactive', () => {
      component.visible = false;
      expect(component.visibleState).toEqual('inactive');
    });
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(DialogComponent);
      component = fixture.componentInstance;
    });

    it('should show if visible', () => {
      const spy = spyOn(component, 'show');
      component.visible = true;
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });

    it('should set dialogTitle if title set', () => {
      component.title = 'test';
      fixture.detectChanges();
      expect(component.dialogTitle).toEqual(component.title);
    });
  });

  describe('show', () => {
    it('should be visible and emit open event', () => {
      const spy = spyOn(component.open, 'emit');
      component.show();
      expect(component.visible).toBeTruthy();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('hide', () => {
    it('should not be visible and emit close event', () => {
      const spy = spyOn(component.close, 'emit');
      component.hide();
      expect(component.visible).toBeFalsy();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('containsTarget', () => {
    it('should be true when closeOnBlur and contains dialog', () => {
      const target = { classList: { contains: () => true } };
      component.closeOnBlur = true;
      expect(component.containsTarget(target)).toBeTruthy();
    });

    it('should be false when !closeOnBlur', () => {
      const target = { classList: { contains: () => true } };
      component.closeOnBlur = false;
      expect(component.containsTarget(target)).toBeFalsy();
    });
  });

  describe('onEscapeKeyDown', () => {
    it('should call hide when closeOnEscape', () => {
      const spy = spyOn(component, 'hide');
      component.closeOnEscape = true;
      component.onEscapeKeyDown();
      expect(spy).toHaveBeenCalled();
    });

    it('should not call hide when !closeOnEscape', () => {
      const spy = spyOn(component, 'hide');
      component.closeOnEscape = false;
      component.onEscapeKeyDown();
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('onDocumentClick', () => {
    it('should hide if contains target', () => {
      const spy = spyOn(component, 'containsTarget').and.returnValue(true);
      component.visible = true;
      component.onDocumentClick({});
      expect(spy).toHaveBeenCalled();
      expect(component.visible).toBeFalsy();
    });

    it('should not hide if doesnt contain target', () => {
      const spy = spyOn(component, 'containsTarget').and.returnValue(false);
      component.visible = true;
      component.onDocumentClick({});
      expect(spy).toHaveBeenCalled();
      expect(component.visible).toBeTruthy();
    });
  });

  describe('largeFormat', () => {
    beforeEach(() => {
      component.format = DialogFormat.Large;
    });

    it('should hide close button', () => {
      component.closeButton = true;
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('button.close')).not.toBeTruthy();
    });

    it('should hide default header and title', () => {
      component.dialogTitle = 'title';
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('div.ngx-dialog-header')).not.toBeTruthy();
      expect(fixture.nativeElement.querySelector('h2.ngx-dialog-title')).not.toBeTruthy();
    });
  });
});
