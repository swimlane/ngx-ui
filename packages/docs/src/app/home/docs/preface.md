`ngx-ui` is a component and style library for **Angular** projects by [Swimlane](https://swimlane.com)

1. Install `@swimlane/ngx-ui`

```bash
npm install @swimlane/ngx-ui
```

2. Add `ngx-ui` styles in your `angular.json`

```json
{
  "styles": [
    "node_modules/@swimlane/ngx-ui/ngx-ui.css"
  ]
}
```

3. Add SVGs icons as it's shipped separately

```json
{
  "assets": [
    {
      "input": "node_modules/@swimlane/ngx-ui/assets/svgs",
      "glob": "**",
      "output": "/assets/svgs"
    }
  ]
}
```

4. Import component module (SCAMs)

```ts
import { NgModule } from '@angular/core';
import { ButtonModule } from '@swimlane/ngx-ui/button';

@NgModule({
  imports: [ButtonModule]
})
export class SomeModule {
}
```
