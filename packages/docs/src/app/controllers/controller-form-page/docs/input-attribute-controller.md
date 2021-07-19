## Usage

1. Import `InputAttributeModule`

```ts
import { NgModule } from '@angular/core';
import { InputAttributeModule } from '@swimlane/ngx-ui/input-attribute';

@NgModule({
  imports: [InputAttributeModule],
})
export class SomeModule {}
```

2. Attach `ngxInputAttribute` on a component tag

```html
<ngx-input ngxInputAttribute></ngx-input>
```

## Inputs

| Name                  | Required/Optional | Default           | HostBinding             | Description                                              |
| --------------------- | ----------------- | ----------------- | ----------------------- | -------------------------------------------------------- |
| hint                  | optional          | -                 | -                       | Hint to the input                                        |
| placeholder           | optional          | -                 | `class.has-placeholder` | Placeholder to the input                                 |
| label                 | optional          | -                 | `class.no-label`        | Label to the input                                       |
| minWidth              | optional          | 60px              | -                       | Minimum width of the input in pixel                      |
| tabindex              | optional          | -1                | -                       | -                                                        |
| min                   | optional          | -                 | -                       | Min validation                                           |
| max                   | optional          | -                 | -                       | Max validation                                           |
| minlength             | optional          | -                 | -                       | Min length validation                                    |
| maxlength             | optional          | -                 | -                       | Max length validation                                    |
| disabled              | optional          | false             | `class.disabled`        | Whether to disable the Input                             |
| required              | optional          | false             | -                       | Whether the Input is required                            |
| autocomplete          | optional          | false             | -                       | Whether the Input should be autocompleted by the Browser |
| autocorrect           | optional          | false             | -                       | Whether the Input should be autocorrected by the Browser |
| spellcheck            | optional          | false             | -                       | Whether the Input should be spellchecked by the Browser  |
| passwordToggleEnabled | optional          | false             | -                       | Whether to show the toggle to show Password text         |
| passwordTextVisible   | optional          | false             | -                       | Should the password text be obscured?                    |
| unlockable            | optional          | false             | -                       | Whether to allow the Input to be lock/unlock             |
| unlockableTooltip     | optional          | 'Click to unlock' | -                       | Tooltip of the unlock icon                               |
| type                  | optional          | `InputType.text`  | -                       | Type of the Input                                        |
