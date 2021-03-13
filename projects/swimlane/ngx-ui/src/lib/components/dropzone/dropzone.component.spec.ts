import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FileUploader } from '@swimlane/ng2-file-upload';

import { DropzoneComponent } from './dropzone.component';

const acceptedFileFormats = ['.txt', '.json'];

describe('DropzoneComponent', () => {
  let component: DropzoneComponent;
  let fixture: ComponentFixture<DropzoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DropzoneComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropzoneComponent);
    component = fixture.componentInstance;
    component.uploader = new FileUploader({});
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('accepted file formats', () => {
      component.uploader = new FileUploader({});
      component.acceptedFileFormats = acceptedFileFormats;
      component.ngOnInit();
      expect(component.acceptedFileFormatsTextDisplay).toEqual('.txt and .json');
    });
  });

  describe('event emitters from parent class', () => {
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
        component.onBeforeUploadItem({} as any);
        expect(spy).toHaveBeenCalled();
      });
    });

    describe('onErrorItem', () => {
      it('should emit event', () => {
        const spy = spyOn(component.errorItem, 'emit');
        component.onErrorItem('test', 500, {});
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
        component.onSuccessItem({}, 'test', 200, {});
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
