```ts
import { ButtonModule } from '@swimlane/ngx-ui/button';
```

`ngx-button` can accept a `Promise` and will
style [based on the `Promise` states](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#description)

- `pending`: show a loading icon
- `fulfilled`: show a check mark
- `rejected`: show an x
