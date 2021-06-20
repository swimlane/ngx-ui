## New Features

### Miscellaneous

- `static ngAcceptInputType_*` is being utilized to provide better type-checking for Language Service

### Common

- `NgxBooleanInput` decorator to coerce `boolean` `@Input`. Used together with `BooleanInput` type-alias
  and `ngAcceptInputType`.
- `NgxNumericInput` decorator to coerce `number` `@Input`. Used together with `NumericInput` type-alias
  and `ngAcceptInputType`.
- `NgxCssPixelInput` decorator to coerce `pixel value` `@Input`. Used together with `CssPixelInput` type-alias
  and `ngAcceptInputType`
- `DestroyedService` to be provided on the Component/Directive provider to use together with `takeUntil`
- `NGX_UI_WINDOW` and `NGX_UI_IS_MAC` Injection tokens are provided

### Utilities

- `queueForNextRender` is an alias for `setTimeout(() => cb())`. The name of the function is used to deliver a better
  intention for force `ChangeDetection`

### Directives

- Add `CopyToClipboardDirective` with support for **double click** as well as **single click** to copy.
- Refactor `LongPressDirective` with support for "hold and fire" with `[ngxLongPressInterval]`
- Implement `ResizeObserverDirective` without `resize-observer-polyfills`
  - `ngxResizeObserverBox` to provide `{box}` options for `observer.observe`. This is an `Attribute` so `string` only
- Implement `IntersectionObserverDirective`
  - `rootMargin` and `threshold` can be customized using `Attribute` `ngxIntersectionObserverRootMargin`
    and `ngxIntersectionObserverThreshold`. These are `Attributes` so `string` value only.
  - `root` can be customized using `ngxIntersectionObserverRoot` directive on a parent element.

## Breaking Changes

### Directives

- `AutosizeInputDirective`
  - `autoSizeInput` -> `ngxAutosizeInput`
- `DblClickCopyDirective` has been changed to `CopyToClipboardDirective`
  - `dbl-click-copy` -> `ngxCopyToClipboard="dblclick"`
- `LongPressDirective`
  - `long-press` -> `ngxLongPress`
  - `[duration]` -> `[ngxLongPress]`
  - `[disabled]` -> `[ngxLongPressDisabled]`
- `ResizeObserverDirective`
  - `[resizeObserver]` -> `[ngxResizeObserver]`
- Remove `VisibilityDirective` in favor of `IntersectDirective` (with `IntersectionObserver` implementation)
  - `visibility (visible)` -> `(ngxIntersect)`

### Pipes

- `CamelToSnakePipe`
  - `cammeltosnake` -> `camelToSnake`
  - Only accepts `string | undefined | null` as value
- `DecamelizePipe` is now type-safe. Only accepts a `string`
- `FilterByPipe` is now type-safe. Only accepts an `Array`.
- `JsonTreePipe` now has type-safe return type which is a `TreeNode[]`
- `TimeZonePipe`
  - `amTimeZone` -> `timeZone`
  - Accepts `MomentInput` type and returns `Moment | string`
