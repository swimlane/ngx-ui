import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FileUploader } from '@swimlane/ng2-file-upload';

import { FileButtonComponent } from './file-button.component';

describe('FileButtonComponent', () => {
  let component: FileButtonComponent;
  let fixture: ComponentFixture<FileButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [FileButtonComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileButtonComponent);
    component = fixture.componentInstance;
    component.uploader = new FileUploader({ });
    component.disabled = false;
    component.multiple = false;
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(FileButtonComponent);
      component = fixture.componentInstance;
    });

    it('should throw error if !uploader and !options', () => {
      let err: Error;

      try {
        fixture.detectChanges()
      } catch (ex) {
        err = ex;
      }

      expect(err).toBeDefined();
    });

    it('should create new uploader if !uploader and options', () => {
      component.options = { };
      fixture.detectChanges();
      expect(component.uploader).toBeDefined();
    });
  });

  describe('onAfterAddingFile', () => {
    it('should set filename and emit event', () => {
      const spy = spyOn(component.afterAddingFile, 'emit');
      component.onAfterAddingFile({ file: { name: 'test' } } as any);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onBeforeUploadItem', () => {
    it('should emit event', () => {
      const spy = spyOn(component.beforeUploadItem, 'emit');
      component.onBeforeUploadItem({  } as any);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onErrorItem', () => {
    it('should emit event', () => {
      const spy = spyOn(component.errorItem, 'emit');
      component.onErrorItem('test', 500, { });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onProgressAll', () => {
    it('should change progress and emit event', () => {
      const spy = spyOn(component.progressAll, 'emit');
      component.onProgressAll(100);
      expect(component.progress).toEqual(100);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('onSuccessItem', () => {
    it('should emit event', () => {
      const spy = spyOn(component.successItem, 'emit');
      component.onSuccessItem({ }, 'test', 200, { });
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('fileOverBase', () => {
    it('should set dropzone state', () => {
      component.fileOverBase(true);
      expect(component.fileOverDropzone).toBeTruthy();
      component.fileOverBase(false);
      expect(component.fileOverDropzone).toBeFalsy();
    });
  });

  describe('clearInput', () => {
    it('should clear input value', () => {
      component.clearInput();
      expect(component.fileInput.nativeElement.value).toBe('');
    });
  });
});
