`ngx-file-button` provides a drag and drop solution as well. This example uses the instance of `FileUploader` to pass to a template.

```html
<ngx-file-button [uploader]="uploaderInstance">
  <ng-template let-uploader>
    <div style="height: 200px; border: 2px dashed #666">
      <div
        style="
              position: relative;
              text-align: center;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            "
      >
        DRAG & DROP YOUR FILE
        <br />
        <div class="ngx-file-button">
          <button type="button" class="ngx-file-button-button" [disabled]="uploader.isUploading">
            <input ng2FileSelect type="file" class="ngx-file-button-input" id="file-input" [uploader]="uploader" />
            <label for="file-input" class="btn btn-link ngx-file-button-label" style="border-bottom: 1px dashed #fff">
              Or click to choose
            </label>
          </button>
        </div>
      </div>
    </div>
  </ng-template>
</ngx-file-button>
```
