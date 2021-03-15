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
});
