```ts
import { FileButtonModule } from '@swimlane/ngx-ui/file-button';
```

`ngx-file-button` takes a [FileUploaderOptions](https://github.com/swimlane/ng2-file-upload/blob/master/projects/ng2-file-upload/src/lib/file-uploader.class.ts#L24-L44) input to configure behaviors of the upload, this is passed to the `options` input. The most common options are going to be the `url` and `autoUpload` properties.

Or [FileUploader](https://github.com/swimlane/ng2-file-upload/blob/master/projects/ng2-file-upload/src/lib/file-uploader.class.ts#L46) instance can be passed to the `uploader` input. The way is most commonly used when manually controlling the file button upload behaviors.
