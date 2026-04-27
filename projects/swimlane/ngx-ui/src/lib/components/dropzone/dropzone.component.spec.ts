import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';

import { DropzoneComponent, DropzoneSize } from './dropzone.component';
import { DropzoneModule } from './dropzone.module';

const uploader = new FileUploader({ url: '' });
const acceptedFileFormats = ['.txt', '.json'];
const oneAcceptedFileFormat = ['.csv'];

xdescribe('DropzoneComponent', () => {
  let fixture: ComponentFixture<DropzoneComponent>;
  let component: DropzoneComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DropzoneModule, HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(DropzoneComponent);
    component = fixture.componentInstance;
    component.uploader = uploader;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  describe('init', () => {
    it('has correct class', () => {
      const el = fixture.debugElement.query(By.css('ngx-file-button'))?.nativeElement;
      expect(el).toHaveClass('ngx-dropzone');
      expect(el).toHaveClass('ngx-dropzone--large');
    });

    it('multiple defaults to true', () => {
      expect(component.multiple).toBe(true);
    });

    it('size defaults to large', () => {
      expect(component.size).toBe(DropzoneSize.Large);
    });

    it('accepted file formats', () => {
      component.acceptedFileFormats = acceptedFileFormats;
      component.ngOnInit();
      expect(component.acceptedFileFormatsTextDisplay).toEqual('.txt and .json');
    });

    it('display proper message when only one file format is added ', () => {
      component.acceptedFileFormats = oneAcceptedFileFormat;
      component.ngOnInit();
      expect(component.acceptedFileFormatsTextDisplay).toEqual('.csv');
    });
  });
});
