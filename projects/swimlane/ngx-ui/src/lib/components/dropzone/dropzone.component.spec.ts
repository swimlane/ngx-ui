import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Shallow } from 'shallow-render';
import { DropzoneComponent, DropzoneSize } from './dropzone.component';
import { DropzoneModule } from './dropzone.module';
import { Rendering } from 'shallow-render/dist/lib/models/rendering';
import { FileUploader } from 'ng2-file-upload';

const uploader = new FileUploader({ url: '' });
const acceptedFileFormats = ['.txt', '.json'];
const oneAcceptedFileFormat = ['.csv'];

describe('DropzoneComponent', () => {
  let shallow: Shallow<DropzoneComponent>;
  let rendering: Rendering<DropzoneComponent, unknown>;

  beforeEach(() => {
    shallow = new Shallow(DropzoneComponent, DropzoneModule).import(HttpClientTestingModule);
  });

  describe('init', () => {
    beforeEach(async () => {
      rendering = await shallow.render({
        bind: {
          uploader
        }
      });
    });

    it('has correct class', () => {
      expect(rendering.find('ngx-file-button').nativeElement).toHaveClass('ngx-dropzone');
      expect(rendering.find('ngx-file-button').nativeElement).toHaveClass('ngx-dropzone--large');
    });

    it('multiple defaults to true', () => {
      expect(rendering.instance.multiple).toBe(true);
    });

    it('size defaults to large', () => {
      expect(rendering.instance.size).toBe(DropzoneSize.Large);
    });

    it('accepted file formats', () => {
      rendering.instance.acceptedFileFormats = acceptedFileFormats;
      rendering.instance.ngOnInit();
      expect(rendering.instance.acceptedFileFormatsTextDisplay).toEqual('.txt and .json');
    });

    it('display proper message when only one file format is added ', () => {
      rendering.instance.acceptedFileFormats = oneAcceptedFileFormat;
      rendering.instance.ngOnInit();
      expect(rendering.instance.acceptedFileFormatsTextDisplay).toEqual('.csv');
    });
  });
});
