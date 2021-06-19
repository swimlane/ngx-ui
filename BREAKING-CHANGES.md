## Directives

- `AutosizeInputDirective` selector: `autoSizeInput` -> `ngxAutosizeInput`
- Add `CopyToClipboardDirective` with support for **double click** as well as **single click** to copy.
- `DblClickCopyDirective` has been changed to `CopyToClipboardDirective`
  - `dbl-click-copy` -> `ngxCopyToClipboard`
- Refactor `LongPressDirective`
  - `long-press` -> `ngxLongPress`
  - `[duration]` -> `[ngxLongPress]`
  - `[disabled]` -> `[ngxLongPressDisabled]`
  - `LongPressDirective` supports for "hold and fire" with `[ngxLongPressInterval]`
- Implement `ResizeObserverDirective` without `resize-observer-polyfills`
  - `[resizeObserver]` -> `[ngxResizeObserver]`
  - `ngxResizeObserverBox` to provide `{box}` options for `observer.observe`. This is an `Attribute` so `string` only
