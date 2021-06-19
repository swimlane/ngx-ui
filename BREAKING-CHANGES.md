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
