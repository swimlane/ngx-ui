## Usage

1. Import `AutofocusModule`

```ts
import { NgModule } from '@angular/core';
import { AutofocusModule } from '@swimlane/ngx-ui/autofocus';

@NgModule({
  imports: [AutofocusModule],
})
export class SomeModule {}
```

2. Attach `ngxAutofocus` on a component tag

```html
<ngx-input ngxAutofocus></ngx-input>
```

## Inputs

| Name                | Required/Optional | Default | HostBinding | Description                                   |
| ------------------- | ----------------- | ------- | ----------- | --------------------------------------------- |
| ngxAutofocus        | optional          | false   | -           | -                                             |
| ngxAutofocusOptions | optional          | -       | -           | Native `FocusOptions` for `HTMLElement#focus` |

## Advance Usage

`AutofocusController` keeps track of a `focusableElement`, which is default to the host `ElementRef`. `focusableElement` can be assigned to a different `HTMLElement` 

```ts
@ViewChild('someOtherElement') set someOtherElementRef(v:ElementRef<HTMLElement>) {
  this.autofocusController.focusableElement = v.nativeElement;
}
```
