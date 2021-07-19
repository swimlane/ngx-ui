## Usage

1. Import `MarginlessModule`

```ts
import { NgModule } from '@angular/core';
import { MarginlessModule } from '@swimlane/ngx-ui/marginless';

@NgModule({
  imports: [MarginlessModule],
})
export class SomeModule {}
```

2. Attach `ngxMarginless` on a component tag

```html
<ngx-input ngxMarginless></ngx-input>
```

## Inputs

| Name          | Required/Optional | Default | HostBinding        | Description |
| ------------- | ----------------- | ------- | ------------------ | ----------- |
| ngxMarginless | optional          | false   | `class.marginless` | -           |
