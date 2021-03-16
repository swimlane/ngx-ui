## Features

- Use `Nx`. Will discuss further.
- `demo` site is revamped and `Scully` enabled.
- `InputBoolean`, `InputNumeric`, and `InputCssPixel` to help with eliminating some getter/setter cases for `boolean`, `number`, and `cssPixel` Inputs
- `InputEnum` is to help with Enum-type Input. Will discuss further (might be removed)
- `DestroyedService` to use with `takeUntil()` instead of `destroy$` subject in various components.
  - `imperativeDestroy()` call is to use to send a signal to `DestroyedService`. To be used in cases where `takeUntil()` needs a signal but `ngOnDestroy` hasn't happened
- No `host` property in `@Component`. All have been converted over to `HostBinding`
  - For `class` binding on Host element, the current usage is `HostBinding('class.className')` instead of `'class'`
- `utils` have been made into individual library as well.

```ts
import { id } from '@swimlane/ngx-ui/utils/id';
import { getType } from '@swimlane/ngx-ui/utils/get-type';
```

- `types` contains common interfaces/types/enums throughout the `ngx-ui` library

## Fixes

- Most Timing API like `setTimeout`/`setInterval` have been refactored to `timer` and `interval` from `rxjs`. Behavior stay the same

## Breaking Changes

- SCAM imports instead of first entry point import

```ts
// before
import { ButtonModule, InputModule } from '@swimlane/ngx-ui';

// after
import { ButtonModule } from '@swimlane/ngx-ui/button';
import { InputModule } from '@swimlane/ngx-ui/input';
```

- CSS Variables in most places instead of SCSS Variables

```scss
// before
$color-blue-500: #1483ff;

// after
:root {
  --ngx-ui-color-blue-500: rgb(20, 131, 255);
  --ngx-ui-color-blue-500-rgb: 20, 131, 255;
  --ngx-ui-color-blue-500-hsl: 211.6595744681deg, 100%, 53.9215686275%;
  --ngx-ui-color-blue-500-h: 211.6595744681deg;
  --ngx-ui-color-blue-500-s: 100%;
  --ngx-ui-color-blue-500-l: 53.9215686275%;
}
```

- SCSS variables that were defined in components' styles have been converted over to CSS variables and moved into `hostClass`

```scss
// before
$color-default: $color-blue-grey-350;
$color-border: $color-blue-grey-650;
.ngx-tip {
  // ...
}

// after
.ngx-tip {
  --ngx-ui-tip-color-default: var(--ngx-ui-color-blue-grey-350);
  --ngx-ui-tip-color-border: var(--ngx-ui-color-blue-grey-650);
}
```

- `.tag` has been changed to `.ngx-tag`. `.tag` is conflicted with `Prism` tokens
- `services` directory has been removed
  - `InjectionService` and `InjectionRegistryService` have been moved into `injection` dir. Exported as `@swimlane/ngx-ui/injection`
  - `IconRegistryService` has been moved into `IconModule`

### `LongPressDirective`

- Selector has been changed from `[long-press]` to `[ngxLongPress]`

### `DblClickCopyDirective`

- Has been refactored to `CopyToClipboardDirective`

### `AutoSizeInputDirective`

- Selector has been changed from `[autoSizeInput]` to `[ngxAutosizeInput]`

### `debounceable`

- Has been renamed to `Debounceable`

### `throttleable`

- Has been renamed to `Throttleable`

### `CamelToSnakePipe`

- Typo (`Cammel`) has been fixed
- Pipe name has been changed from `cammeltosnake` to `camelToSnake`

### `FilterByPipe`

- Has been made strongly typed with Generics. Might break current usage on the consumers' side

### `JsonTreePipe`

- Has been made strongly typed with `TreeNode[]`. Might break current usage on the consumers' side

### `TimeZonePipe`

- Pipe name has been changed from `amTimeZone` to `timeZone`

## Tech-debts

- `strict` mode is enabled so there are a lot of `any` or `type assertion` in the code base
- Some confusion around using Timing/Callback in various services. Eg: `InjectionService` which makes it hard to debug.
