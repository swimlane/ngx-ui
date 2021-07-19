## Usage

1. Import `AutosizeModule`

```ts
import { NgModule } from '@angular/core';
import { AutosizeModule } from '@swimlane/ngx-ui/autosize';

@NgModule({
  imports: [AutosizeModule],
})
export class SomeModule {}
```

2. Attach `ngxAutosize` on a component tag

```html
<ngx-input ngxAutosize></ngx-input>
```

## Inputs

| Name        | Required/Optional | Default | HostBinding      | Description |
| ----------- | ----------------- | ------- | ---------------- | ----------- |
| ngxAutosize | optional          | false   | `class.autosize` | -           |
