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

### Controllers

- `ngx-ui` utilizes the Controller pattern to share functionalities instead of the legacy mixins approach.
- Controller can be attached on any component/element as an Attribute Directive. For example:

```html
<ngx-input ngxSize="sm" ngxAppearance="fill"></ngx-input>
```

- Module needs to be imported to use a Controller. `ngxSize` is exported from `SizeModule`, `ngxAppearance` is exported
  from `AppearanceModule` and so on.

#### SizeController

- `ngxSize` accepts the key of `Size` enum as input.
- Bind value on Host's class (`class.sm|md|lg`)

#### AppearanceController

- `ngxAppearance` accepts the key of `Appearance` enum as input.
- Bind value on Host's class (`class.fill|legacy`)

#### MarginlessController

- `ngxMarginless` accepts a boolean as input
- Bind value on Host's class (`class.marginless`)

#### AutosizeController

- `ngxAutosize` accepts a boolean as input
- Bind value on Host's class (`class.autosize`)

#### AutofocusController

- `ngxAutofocus` accepts a boolean as input
- `[ngxAutofocusOptions]` accepts `FocusOptions` as input
- Use `focusableElement` to change the `HTMLElement` as you see fit. Default to `Host#elementRef#nativeElement`

```ts
@ViewChild('someOtherElement') set
someOtherElementRef(v:ElementRef<HTMLElement>) {
  this.autofocusController.focusableElement = v.nativeElement;
}
```

#### InputAttributeController

- Provides common Input attributes like min, max, required, disabled etc...
- `[type]` accepts the key of `InputType` enum

## Breaking Changes

### Common

- `InputTypes` has been renamed to `InputType`
- All Enums are **camelCase** instead of **PascalCase**. For example:

```ts
// before
export enum ButtonState {
  Active = 'active',
  InProgress = 'inProgress',
  Success = 'success',
  Failed = 'failed',
}

// after
export enum ButtonState {
  active = 'active',
  inProgress = 'inProgress',
  success = 'success',
  failed = 'failed',
}
```

- All components styles have been adjusted to be divisible by 2/4/8 (16px or 1rem base)

### Directives

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

#### CodeEditor

- Selector has been changed from `ngx-codemirror` to `ngx-code-editor` to match with the component's name
- `[config]` has been strong-typed to `Partial<CodeMirror.EditorConfiguration>`
- `[readOnly]` has been strongly-typed to `CodeMirror.EditorConfiguration['readOnly']`
- `[allowDropFileTypes]` has been strongly-typed to `CodeMirror.EditorConfiguration['allowDropFileTypes']`
- `[gutters]` has been strongly-typed to `CodeMirror.EditorConfiguration['gutters']`
- `[mode]` has been strongly-typed to `CodeMirror.EditorConfiguration['mode']`
- `[lint]` has been strongly-typed to `CodeMirror.EditorConfiguration['lint']`
- `(change)` has been renamed to `(codeEditorChange)`
- `(blur)` has been renamed to `(codeEditorBlur)`

#### Input

- `AutosizeInputDirective` has been moved to local `InputComponent`
- `selector` has been changed from `autoSizeInput` to `ngxAutosizeInput`
- `(change)` has been renamed to `(inputChange)`
- `(blur)` has been renamed to `(inputBlur)`
  - `inputBlur` emits `FocusEvent` instead of `Event`
- `(focus)` has been renamed to `(inputFocus)`
- `(keyup)` has been renamed to `(inputKeyup)`
- `(click)` has been renamed to `(inputClick)`
- `(select)` has been renamed to `(inputSelect)`
- `[appearance]`: check [AppearanceController](#appearancecontroller)
- `[size]`: check [SizeController](#sizecontroller)
- `[withMargin]`: check [MarginlessController](#marginlesscontroller)
- `[autofocus]`: check [AutofocusController](#autofocuscontroller)
- `[autosize]`: check [AutosizeController](#autosizecontroller)
- Other attributes check [InputAttributeController](#inputattributecontroller)

#### Dialog

- `(open)` has been renamed to `(dialogOpen)`
- `(close)` has been renamed to `(dialogClose)`
- `[title]` is removed. Use `[dialogTitle]` instead

#### LargeFormatDialogContent

- Now has its own module `LargeFormatDialogModule` and no longer belong to `DialogModule`
- `largeFormatDialogStepper` has been renamed to `ngxLargeFormatDialogStepper`
- `largeFormatDialogSubStepper` has been renamed to `ngxLargeFormatDialogSubStepper`
- `largeFormatDialogTabs` has been renamed to `ngxLargeFormatDialogTabs`
- `largeFormatDialogSubTabs` has been renamed to `ngxLargeFormatDialogSubTabs`

#### Alert

- Now has its own module `AlertModule` and no longer belong to `DialogModule`

#### Overlay

- `show()` parameter has been strongly typed to `{ triggerComponent: ComponentRef<unknown>, zIndex: number }` instead
  of `any`

#### LongPressButton

- Now has its own module `LongPressButtonModule` and no longer belong to `ButtonModule`
- `[state]` accepts a string union of `keyof LongPressButtonState` instead of the enum itself

#### DateTime

- `(change)` has been renamed to `(dateTimeChange)`
- `(blur)` has been renamed to `(dateTimeBlur)`
- `(selected)` has been renamed to `(dateTimeSelected)`

#### Drawer

- `[drawerContainer]` has been renamed to `[ngxDrawerContainer]`


#### Dropdown

##### DropdownToggle

- `[showEvent]` accepts a string union of `keyof DropdownShowTypes` instead of the enum itself
