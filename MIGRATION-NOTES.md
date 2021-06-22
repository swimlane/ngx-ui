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

### Common

- All Enums are **camelCase** instead of **PascalCase**. For example:

```ts
// before
export enum ButtonState {
  Active = 'active',
  InProgress = 'inProgress',
  Success = 'success',
  Failed = 'failed'
}

// after
export enum ButtonState {
  active = 'active',
  inProgress = 'inProgress',
  success = 'success',
  failed = 'failed'
}
```

- All components styles have been adjusted to be divisible by 2/4/8 (16px or 1rem base)

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

### Components

#### Button

- `[promise]` is now a `Promise<unknown>` instead of `Promise<any>`
- `[state]` accepts a string union of `keyof ButtonState` instead of `ButtonState` enum itself.

#### FileButton

- `FileButtonStyleType` enum is renamed to `FileButtonStyle`
- `[styleType]` accepts a string union of `keyof FileButtonStyle` instead of `FileButtonStyle` enum itself.
- `(successItem)` has been made type-safe
  with `{item: FileItem; response: string; status: number; headers: ParsedResponseHeaders;}`
- `(errorItem)` has been made type-safe
  with `{item: FileItem; response: string; status: number; headers: ParsedResponseHeaders;}`

#### Calendar

- `(change)` is renamed to `(dateChange)`

#### Card

- `[orientation]` accepts a string union of `keyof CardOrientation` instead of `CardOrientation` enum itself.
- `[appearance]` accepts a string union of `keyof CardAppearance` instead of `CardAppearance` enum itself.
- `[status]` accepts a string union of `keyof CardStatus` instead of `CardStatus` enum itself.
- `(select)` has been renamed to `(cardSelect)`
- `(outlineClick)` has been renamed to `(cardOutlineClick)`

###### CardAvatar

- `[status]` accepts a string union of `keyof CardStatus` instead of `CardStatus` enum itself.

###### CardPlaceholder

- `[size]` accepts a string union of `keyof CardPlaceholderSize` instead of `CardPlaceholderSize` enum itself.

#### Checkbox

- `(change)` has been renamed to `(checkboxChange)`
- `(focus)` has been renamed to `(checkboxFocus)`
- `(blur)` has been renamed to `(checkboxBlur)`
