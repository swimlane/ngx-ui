```ts
import { FileUploader } from '@swimlane/ng2-file-upload';

@Component({
  selector: 'app',
  templateUrl: 'app.template.html'
})
export class AppComponent {
  uploaderInstance = new FileUploader({
    url: 'https://evening-anchorage-3159.herokuapp.com/api/',
    autoUpload: false
  });
}
```
