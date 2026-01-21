import { Shallow } from 'shallow-render';
import { Rendering } from 'shallow-render/dist/lib/models/rendering';
import { FileUploader } from 'ng2-file-upload';

import { FileButtonComponent } from './file-button.component';
import { ButtonModule } from './button.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const uploader = new FileUploader({ url: '' });

describe.skip('FileButtonComponent', () => {
  let shallow: Shallow<FileButtonComponent>;
  let rendering: Rendering<FileButtonComponent, unknown>;

  beforeEach(() => {
    shallow = new Shallow(FileButtonComponent, ButtonModule).import(HttpClientTestingModule);
  });

  describe('ngOnInit', () => {
    beforeEach(async () => {
      rendering = await shallow.render({ detectChanges: false });
    });

    it('should throw error if !uploader and !options', () => {
      let err: Error;

      try {
        rendering.instance.ngOnInit();
      } catch (ex) {
        err = ex;
      }

      expect(err).toBeDefined();
    });

    it('should create new uploader if !uploader and options', () => {
      rendering.instance.options = { url: '' };
      rendering.instance.ngOnInit();
      expect(rendering.instance.uploader).toBeDefined();
    });
  });

  describe('outputs', () => {
    beforeEach(async () => {
      rendering = await shallow.render({
        bind: {
          uploader
        }
      });
    });

    describe('onAfterAddingFile', () => {
      it('should set filename and emit event', () => {
        rendering.instance.onAfterAddingFile({ file: { name: 'test' } } as any);
        expect(rendering.instance.afterAddingFile.emit).toHaveBeenCalled();
      });
    });

    describe('onBeforeUploadItem', () => {
      it('should emit event', () => {
        rendering.instance.onBeforeUploadItem({} as any);
        expect(rendering.instance.beforeUploadItem.emit).toHaveBeenCalled();
      });
    });

    describe('onErrorItem', () => {
      it('should emit event', () => {
        rendering.instance.onErrorItem('test', 500, {});
        expect(rendering.instance.errorItem.emit).toHaveBeenCalled();
      });
    });

    describe('onProgressAll', () => {
      it('should change progress and emit event', () => {
        rendering.instance.onProgressAll(100);
        expect(rendering.instance.progress).toEqual(100);
        expect(rendering.instance.progressAll.emit).toHaveBeenCalled();
      });
    });

    describe('onSuccessItem', () => {
      it('should emit event', () => {
        rendering.instance.onSuccessItem({}, 'test', 200, {});
        expect(rendering.instance.successItem.emit).toHaveBeenCalled();
      });
    });

    describe('fileOverBase', () => {
      it('should set dropzone state', () => {
        rendering.instance.fileOverBase(true);
        expect(rendering.instance.fileOverDropzone).toBeTruthy();
        rendering.instance.fileOverBase(false);
        expect(rendering.instance.fileOverDropzone).toBeFalsy();
      });
    });
  });

  describe('clearInput', () => {
    beforeEach(async () => {
      rendering = await shallow.render({
        bind: {
          uploader
        }
      });
    });
    it('should clear input value', () => {
      rendering.instance.clearInput();
      expect(rendering.instance.fileInput.nativeElement.value).toBe('');
    });
  });

  describe('dropzone template', () => {
    beforeEach(async () => {
      rendering = await shallow.render(
        `
        <ngx-file-button [uploader]="uploader">
          <ng-template #dropzoneTemplate let-uploader>
            <input
              [id]="id"
              type="file"
              ng2FileSelect
              [uploader]="uploader"
            />
            <label [attr.for]="id">Label</label>
          </ng-template>
        </ngx-file-button>
        `,
        {
          bind: {
            uploader
          }
        }
      );
    });

    it('has custom dropzone template', () => {
      expect(rendering.instance.dropzoneTemplate).toBeTruthy();
    });

    it('has custom input and label', () => {
      expect(rendering.find('input').nativeElement).toBeTruthy();
      expect(rendering.find('label').nativeElement).toBeTruthy();
      expect(rendering.find('label').nativeElement.innerText).toEqual('Label');
    });
  });
});
