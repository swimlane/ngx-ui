## Usage

1. Import `AppearanceModule`

```ts
import { NgModule } from '@angular/core';
import { AppearanceModule } from '@swimlane/ngx-ui/appearance';

@NgModule({
  imports: [AppearanceModule],
})
export class SomeModule {}
```

2. Attach `ngxAppearance` on a component tag

```html
<ngx-input ngxAppearance></ngx-input>
```

## Inputs

| Name          | Required/Optional | Default             | HostBinding                  | Description |
| ------------- | ----------------- | ------------------- | ---------------------------- | ----------- |
| ngxAppearance | optional          | `Appearance.legacy` | `class.legacy`or`class.fill` | -           |

## Caveat

`ngxAppearance` needs to be attached on the component for the default value and default `HostBinding` to take effect.
