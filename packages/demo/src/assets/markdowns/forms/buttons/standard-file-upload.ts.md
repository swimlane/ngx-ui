```ts
import { FileUploaderOptions } from '@swimlane/ng2-file-upload';

@Component({
  selector: 'app',
  templateUrl: 'app.template.html'
})
export class AppComponent {
  uploadOptions: FileUploaderOptions = {
    url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    autoUpload: true
  };
}
```
