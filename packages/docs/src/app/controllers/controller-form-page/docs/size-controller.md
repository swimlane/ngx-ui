## Usage

1. Import `SizeModule`

```ts
import { NgModule } from '@angular/core';
import { SizeModule } from '@swimlane/ngx-ui/size';

@NgModule({
  imports: [SizeModule],
})
export class SomeModule {}
```

2. Attach `ngxSize` on a component tag

```html
<ngx-input ngxSize></ngx-input>
```

## Inputs

| Name    | Required/Optional | Default      | HostBinding                        | Description |
| ------- | ----------------- | ------------ | ---------------------------------- | ----------- |
| ngxSize | optional          | `Size.small` | `class.sm`or`class.md`or`class.lg` | -           |

## Caveat

`ngxSize` needs to be attached on the component for the default value and default `HostBinding` to take effect.
