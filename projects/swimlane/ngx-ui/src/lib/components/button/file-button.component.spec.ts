import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';

import { FileButtonComponent } from './file-button.component';
import { ButtonModule } from './button.module';

const uploader = new FileUploader({ url: '' });

@Component({
  template: `
    <ngx-file-button [uploader]="uploader">
      <ng-template #dropzoneTemplate let-uploader>
        <input [id]="id" type="file" ng2FileSelect [uploader]="uploader" />
        <label [attr.for]="id">Label</label>
      </ng-template>
    </ngx-file-button>
  `,
  standalone: false
})
class FileButtonDropzoneTemplateHost {
  uploader = uploader;
  id = 'test-id';
}

xdescribe('FileButtonComponent', () => {
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('ngOnInit', () => {
    let component: FileButtonComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ButtonModule, HttpClientTestingModule]
      });
      const fixture = TestBed.createComponent(FileButtonComponent);
      component = fixture.componentInstance;
    });

    it('should throw error if !uploader and !options', () => {
      let err: Error;

      try {
        component.ngOnInit();
      } catch (ex) {
        err = ex;
      }

      expect(err).toBeDefined();
    });

    it('should create new uploader if !uploader and options', () => {
      component.options = { url: '' };
      component.ngOnInit();
      expect(component.uploader).toBeDefined();
    });
  });

  describe('outputs', () => {
    let component: FileButtonComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ButtonModule, HttpClientTestingModule]
      });
      const fixture = TestBed.createComponent(FileButtonComponent);
      component = fixture.componentInstance;
      component.uploader = uploader;
      fixture.detectChanges();
      spyOn(component.afterAddingFile, 'emit');
      spyOn(component.beforeUploadItem, 'emit');
      spyOn(component.errorItem, 'emit');
      spyOn(component.progressAll, 'emit');
      spyOn(component.successItem, 'emit');
    });

    describe('onAfterAddingFile', () => {
      it('should set filename and emit event', () => {
        component.onAfterAddingFile({ file: { name: 'test' } } as any);
        expect(component.afterAddingFile.emit).toHaveBeenCalled();
      });
    });

    describe('onBeforeUploadItem', () => {
      it('should emit event', () => {
        component.onBeforeUploadItem({} as any);
        expect(component.beforeUploadItem.emit).toHaveBeenCalled();
      });
    });

    describe('onErrorItem', () => {
      it('should emit event', () => {
        component.onErrorItem('test', 500, {});
        expect(component.errorItem.emit).toHaveBeenCalled();
      });
    });

    describe('onProgressAll', () => {
      it('should change progress and emit event', () => {
        component.onProgressAll(100);
        expect(component.progress).toEqual(100);
        expect(component.progressAll.emit).toHaveBeenCalled();
      });
    });

    describe('onSuccessItem', () => {
      it('should emit event', () => {
        component.onSuccessItem({}, 'test', 200, {});
        expect(component.successItem.emit).toHaveBeenCalled();
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
  });

  describe('clearInput', () => {
    let component: FileButtonComponent;
    let fixture: ComponentFixture<FileButtonComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ButtonModule, HttpClientTestingModule]
      });
      fixture = TestBed.createComponent(FileButtonComponent);
      component = fixture.componentInstance;
      component.uploader = uploader;
      fixture.detectChanges();
    });
    it('should clear input value', () => {
      component.clearInput();
      expect(component.fileInput?.nativeElement.value).toBe('');
    });
  });

  describe('dropzone template', () => {
    let fixture: ComponentFixture<FileButtonDropzoneTemplateHost>;
    let component: FileButtonComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ButtonModule, HttpClientTestingModule],
        declarations: [FileButtonDropzoneTemplateHost]
      });
      fixture = TestBed.createComponent(FileButtonDropzoneTemplateHost);
      fixture.detectChanges();
      const fileButton = fixture.debugElement.query(By.directive(FileButtonComponent));
      component = fileButton.componentInstance;
    });

    it('has custom dropzone template', () => {
      expect(component.dropzoneTemplate).toBeTruthy();
    });

    it('has custom input and label', () => {
      const input = fixture.debugElement.query(By.css('input'));
      const label = fixture.debugElement.query(By.css('label'));
      expect(input?.nativeElement).toBeTruthy();
      expect(label?.nativeElement).toBeTruthy();
      expect(label?.nativeElement.innerText).toEqual('Label');
    });
  });
});
