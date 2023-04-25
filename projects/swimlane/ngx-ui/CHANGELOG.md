# CHANGELOG

## 44.5.3 (2023-4-25)

- Fix (`ngx-select-dropdown`): focus should be on the items of dropdown and should be navigable through keyboard arrows

## 44.5.2 (2023-4-19)

- Fix (`ngx-json-object-node-flat`): Remove pre-check for schema property when updating a property name. `schemaBuilderMode` determines which schema to update, `schemaRef` or `schema`

## 44.5.1 (2023-4-11)

- Fix (`ngx-button-toggle-group`): change should be detected upon new incoming value

## 44.5.0 (2023-4-6)

- Enhancement (`ngx-select-option`): added support for displaying tooltips

## 44.4.1 (2023-4-4)

- Fix (`ngx-button-toggle-group`): reset/correct animation dimensions
- Fix (`ngx-section`): toggle with both header and button now works correctly

## 44.4.0 (2023-3-25)

- Feature (`ngx-button-toggle-group`): A new component which provides ability to toggle buttons

## 44.3.1 (2023-3-23)

- Fix (`ngx-input`): textarea autosize directive respects the initial value and adjusts the height accordingly

## 44.3.0 (2023-3-21)

- Feature (`ngx-large-format-dialog-content`): now accepts a `removeImageBackground` input to allow the removal of the default, white background
- Feature (`ngx-card-avatar`): now accepts a `removeImageBackground` input to allow the removal of the default, white background

## 44.2.0 (2022-12-27)

- Feature: `ngx-tree` now support virtual scrolling

## 44.1.0 (2022-12-23)

- Fix (`ngx-json-editor-flat`): node redraws at bottom of JSON tree when previous value is cleared from `ngx-select`

## 44.0.0 (2022-12-19)

- Feature (`ngx-input`): add pattern for integer validation on playbook inputs

## 43.0.0 (2022-12-16)

- Feature: Create `ButtonGroupComponent`
- Fix: Add `cursor: pointer` to `ngx-button` class
- Feature: `ngx-button` now accepts a `type` input
- Breaking: `ngx-button` now defaults to `type="button"`
- Fix: `ngx-json-editor-flat` array nodes will forward `schemaUpdate` events from nested nodes

## 42.5.0 (2022-10-17)

- Added angular cli schematics for installing ngx-ui
- Fix (`ngx-dropzone`): fix dropzone animation

## 42.4.0 (2022-9-15)

- Feature (`ngx-medium-format-dialog-content`): Add medium sizes variant of large format dialog.

## 42.3.1 (2022-9-7)

- Feature (`ngx-json-editor-flat`): Allow custom template for nodes

## 42.2.1 (2022-8-31)

- Fix (`ngx-button`): Allow overflow-y so that text is not cut off.
- Fix (`ngx-select`): Vertically aligned clear and caret buttons. Clear and caret button sizes change with parent text size.
- Fix (`ngx-input`, others): Adjust input label position.
- Bump to Cypress version 10.6.0

## 42.1.1 (2022-7-18)

- Fix (`ngx-select`): Filter input doesn't consistently autofocus on open
- Fix (`ngx-json-editor-flat`): Fix bugs on json editor flat to allow to create array of objects
- Enhancement (`ngx-dropdown`): Improve styles and behavior of dividers

## 42.1.0 (2022-7-12)

- Feature (`ngx-input`): Added `readonly` input

## 42.0.9 (2022-7-12)

- Enhancement (`ngx-dialog`): Dialog close behavior can be controlled by `beforeClose` method when `closeOnEscape` or `closeOnBlur` are `true`

## 42.0.8 (2022-6-24)

- Fix (`ngx-json-editor-flat`): Applying titlecase pipe to type value in html.

## 42.0.7 (2022-6-24)

- Enhancement (`ngx-select`): Add option values as `data-value` attribute.
- Enhancement (`ngx-json-editor-flat`): Add support for binary format properties.

## 42.0.6 (2022-6-8)

- Fix (`ngx-json-editor-flat`): "Add a property" has correct indention when `hideRoot = false`
- Ensure object types have `required` object when adding children

## 42.0.5 (2022-6-8)

- Fix (`ngx-json-editor-flat`): Ensure top level object "Add a property" has correct color when `hideRoot = true`
- Fix (`ngx-json-editor-flat`): Ensure object types have `properties` object when adding children
- Fix (`ngx-json-editor-flat`): Replace "Add your first property" with "Add a property" per design

## 42.0.4 (2022-6-1)

- Enhancement (`ngx-large-format-dialog-content`): Template for custom logo
- Enhancement (`ngx-large-format-dialog-content`): Active tab indicator (blue line) position

## 42.0.3 (2022-5-17)

- Enhancement (`ngx-property-config`): names generated from title are now Snake_Case
- BREAKING (`PipesModule`): Rename `cammeltosnake` to `cameltosnake`

## 41.0.0 (2022-5-12)

- Enhancement (`ngx-large-format-dialog-content`): Changing Active tab indicator (blue line) to the header bottom line level
- Fix (`ngx-select`): Tagging option width is not correct
- Fix (`ngx-property-config`): Apply button no longer closes all dialogs
- Fix (`ngx-json-editor-flat`): Long name and descriptions now display properly
- Feature (`ngx-property-config`): When a new property is added (in schema builder mode):
  - the property dialog is shown
  - the property name is generated from the title
  - the property type is editable
- Feature (`ngx-input`): Now emits `lockChange` even when an input is unlocked
- Enhancement: Added webhook icons
- BREAKING (`ngx-property-config`): Type is not editable once a property is added

## 40.4.0 (2022-4-12)

- Feature (`ngx-tooltip`): Added overall max width of 600px
- Fix (`ngx-tooltip`): Ensure unbroken strings can wrap
- Fix (`ngx-large-format-dialog-content`): Display subtitle container only when there is subtitle

## 40.3.0 (2022-4-12)

- Fix (`ngx-button`): Don't wrap text, show ellipsis when text is too long
- Chore: Bumped dependencies

## 40.2.0 (2022-4-5)

- Feature (`ngx-large-format-dialog-content`): Custom template support for subtitle
- Fix (`ngx-select`): More overflow issues

## 40.1.0 (2022-3-30)

- Fix: Display proper supports message with only one allowed file format on `Dropzone` component
- Fix: Fix various alignment issues in selects
- Fix: select box with tagging enabled triggers form submit on enter

## 40.0.0 (2022-3-23)

- BREAKING (`ngx-button`): now defaults to `type="button"` @a11y
- Feature (`ngx-button`): now accepts a `type` input @a11y

## 39.2.0 (2022-3-11)

- Feature: Add small style variant to Dropzone component
- Fix: Style fixes for JSON editor component

## 39.1.0 (2022-3-8)

- Fix: Issues with the json Editor
- Fix: change the JsonEditor errors
- Fix: Add an array inside an array in json editor works
- Fix: Adding a code, date, date-time or password inside an Array in the json Editor works
- Fix: add vertical margin between rows of tags in select component

## 39.0.0 (2022-2-28)

- BREAKING (`json-editor-flat`): Updated `json-editor-flat` component styles. Removed the `compact` input
- Enhancement (`ngx-select`): use current ngx-ui icons for buttons
- Fix (`ngx-select`): control alignment
- Fix (`ngx-select`): clear button position when dropdown is disabled
- Fix (`ngx-select`): background in fill appearance to avoid saturation issue @ally
- Fix (`ngx-select`): stop propagation on button click inside `ngx-select`

## 38.1.0 (2022-2-23)

- Enhancement (`ngx-date-time`):disable popup when input has focus
- Fix: Hover states now work on hover
- Fix (`ngx-button`): Success and failed states for primary gradient now show background @a11y
- Fix: Removed border for success and failed states
- Fix (`ngx-date-time`): input changes when focused causing partial user input to be lost
- Fix: Escape special character on select filter regex

## 38.0.0 (2022-2-16)

- BREAKING: escape HTML in labels of input, select and date time components

## 37.1.1 (2022-2-8)

- Fix: Revert Mousetrap import in HotKeys service

## 37.1.0 (2022-2-1)

- Enhancement (`ngx-large-format-dialog`): add ability to display an image in `ngx-large-format-dialog` header
- Enhancement: adding additional information for installation in README.md
- Fix: cypress calendar test

## 37.0.0 (2022-1-20)

- BREAKING: (`ngx-date-time`): no longer displays it's own validation messages
- BREAKING: (`ngx-select`): now deselects an selected option when the user clicks on the same option
- Feature (`ngx-date-time`): added timezone popup
- Feature (`ngx-time`): added `ngx-time` component
- Enhancement: `ngx-date-time` now sets default formats based on precision
- Enhancement (`ngx-radiobutton`, `ngx-radiobutton-group`): improved keyboard accessibility @a11y
- Enhancement (`ngx-select`): Improved keyboard accessibility @a11y
- Enhancement (`ngx-input`): Add ability to unlock `ngx-input` for passwords
- Enhancement ( `ngx-checkbox`): Add `checked` and `checkedChange`
- Enhancement ( `ngx-checkbox`): Keyboard accessibility @a11y
- Enhancement (`ngx-calendar`): Keyboard accessibility @a11y
- Enhancement ( `ngx-date-time`): now sets default formats based on precision
- Enhancement (`ngx-radiobutton`, `ngx-radiobutton-group`): Improved keyboard accessibility @a11y
- Fix (`ngx-radiobutton`, `ngx-radiobutton-group`): Fixed issues with form controls
- Fix (`ngx-date-time`): now works with form controls
- Fix (`ngx-select`): now displays correctly with form controls validations
- Fix (`ngx-select`): no longer displays focus and allows clearing when disabled
- Fix (`ngx-radiobutton`, `ngx-radiobutton-group`): Fixed issues with form controls
- Fix (`ngx-date-time`): `ngx-date-time` now works with form controls @a11y
- Fix (`ngx-select`): `ngx-select` now displays correctly with form controls validations
- Fix (`ngx-select`): `ngx-select` no longer displays focus and allows clearing when disabled

## 36.1.0 (2021-12-10)

- Enhancement: allow exponential notation for number inputs
- Enhancement (`ngx-input`): add aria labels for unlock and reveal password buttons @a11y

## 36.0.0 (2021-12-03)

- BREAKING (`ngx-tabs`): Improve semantic HTML @a11y
- BREAKING: Fixed spelling error in exported enum (`SectionApperance` -> `SectionAppearance`)
- Feature: Added focus rings to `ngx-tabs` buttons @a11y
- Enhancement: Add vertical alignment for `ngx-tabs`
- Enhancement (`ngx-tabs`): Added ARIA role attributes @a11y
- Enhancement (`ngx-section`): `headerToggle` is now keyboard accessible @a11y
- Enhancement (`ngx-section`): Added ARIA controls and expanded attribute @a11y
- Enhancement (`ngx-tabs`): Added 'light' appearance

## 35.9.0 (2021-11-29)

- Feature (`ngx-dropdown`): add `forceDownwardOpening` input
- Fix (`ngx-dropdown`): set default `forceDownwardOpening` to false

## 35.8.1 (2021-10-26)

- Fix: prevent `ngx-input` buttons from submitting forms @a11y
- Fix: Buttons should not have outline on click
- Fix: Fix error thrown from `ngx-select` on destroy

## 35.8.0 (2021-10-15)

- Enhancement (`ngx-select`): Add optional forceDownwardOpening option to `ngx-select`
- Enhancement (`ngx-select`): Keep opening downwards when intersecting viewport top

## 35.7.2 (2021-10-14)

- Fix (`ngx-select`): Fix issue where `active` class was not updated when the dropdown was closed

## 35.7.1 (2021-10-13)

- Fix (buttons): Fix issue where buttons were reported as covered by Cypress

## 35.7.0 (2021-10-07)

- Feature (`Dropdown`): Add viewport intersection to support opening select dropdowns if hidden by viewport.
- Feature (`ngx-button`): Added focus rings to buttons @a11y
- Feature: Add `passwordToggleEnabled` input to JSON editor.
- Enhancement (`ngx-select`): Improve semantic HTML in `ngx-input` @a11y
- Enhancement (`ngx-input`): Added `for` attribute to labels @a11y
- Enhancement (`ngx-plus-menu`): Added ARIA role attributes @a11y
- Enhancement: Added 'light' appearance to `ngx-section`
- Enhancement (`ngx-tabs`): Improve active tab contrast @a11y
- Enhancement: Add input, `textareaRows` to allow setting `row` attribute of `ngx-input` textarea
- Fix: Toggle going out of bounds when disabled in `ngx-toggle`
- Fix: Use input password type for password fields in JSON editor.
- Fix: Call to `onTouchedCallback()` should be executed on blur, per `ControlValueAccessor.registerOnTouched` docs
- Fix (`ngx-tabs`): Tabs are now `type="button"` @a11y
- Fix: Adjust label position and background of `ngx-input` fill appearance
- Fix: Add capability of disabling `ngx-select` elements using its `FormControl` when used inside a reactive form.

## 35.6.8 (2021-07-16)

- BREAKING: Upgrade to Angular 12 (#633)
- Revert to `master` branch

## 35.6.7 (2021-06-29)

- Fix (`ngx-select`): not populating selected options once `options` changes

## 35.6.6 (2021-06-08)

- Enhancement: Updated import and export icon style (#625)

## 35.6.5 (2021-06-08)

- Enhancement: Add `warning` status to `tip` component
- Enhancement: Add ability to display custom icon on `tip` component
- Enhancement: Add ability to add new values via `Shift + ⏎` on select component when `allowAdditions` is true

## 35.6.4 (2021-05-25)

- Enhancement: Add validation when change on `minDate` or `maxDate` occurs to the `date-time` component.

## 35.6.3 (2021-05-03)

- Fix: Adjust `line-height` on `LargeFormatDialogContent#dialogTitle` to prevent cut off from overflow for truncating

## 35.6.2 (2021-05-03)

- Fix: Align `LargeFormatDialogContent#dialogTitle` when `dialogSubtitle` does not exist

## 35.6.1 (2021-05-03)

- Feature: Add `skipDirtyAlert` input to `LargeFormatDialogContent`
- Fix: LargeFormatDialog title layout when `subtitle` does not have value.
- Fix: Change `LargeFormatDialogContentComponent` background to a gradient background
- Fix: Expose `LargeFormatDialogContentComponent` on public API
- Fix: Change `DialogDrawerContentComponent#title` to `drawerTitle`
- Feature: Add `$bg-linear3` to Gradients
- Docs: Add usage of `DialogDrawerContentComponent` to demo
- Fix: change events emitted inside a select field are propagated to the select component.

## 35.6.0 (2021-04-28)

- Refactor: `ngx-large-format-dialog-content` Stepper and Tabs variant usage

  - The variants are now driven via `ng-template` and custom directives instead of Content Project due to limit of
    Content Project when it comes to nested elements.

  ```html
  <ngx-large-format-dialog-content>
    <!-- before -->
    <ngx-stepper></ngx-stepper>

    <!-- after -->
    <ng-template largeFormatDialogStepper>
      <ngx-stepper></ngx-stepper>
    </ng-template>
  </ngx-large-format-dialog-content>
  ```

  ```html
  <ngx-large-format-dialog-content>
    <!-- before -->
    <ngx-tabs></ngx-tabs>

    <!-- after -->
    <ng-template largeFormatDialogTabs>
      <ngx-tabs></ngx-tabs>
    </ng-template>
  </ngx-large-format-dialog-content>
  ```

  - This change also allows for nesting Stepper and Tabs

- Enhancement (`ngx-large-format-dialog-footer`): apply default styles. Items will be center by default with a `0.5rem`
  gap. `[styleClass]` input nullifies the default.
- Fix: Export `DialogFormat` from `public_api`

## 35.5.1 (2021-04-22)

- Chore: Add `ng-in-viewport` as a peer dependency

## 35.5.0 (2021-04-22)

- Enhancement: Added icons (#595)
- Enhancement(Dropdown): Add viewport intersection to change the direction of the dropdown menu upwards or downwards.

## 35.4.0 (2021-04-22)

- Feature (`CardComponent`): add error outline
- Feature (`JsonEditor`): add support multiline support for string nodes
- Feature (`LargeFormatDialogContentComponent`): add new component as wrapper for Dialog content
- Enhancement: Add `$color-error` css var
- Fix (`DropzoneComponent`): addressing minor design review feedback
- Fix: add label color to ToggleComponent, RadioButtonComponent, CheckboxComponent
- Fix (`TipComponent`): change error color

## 35.3.1 (2021-03-29)

- Fix (`DropzoneComponent`): addressing minor design review feedback

## 35.3.0 (2021-03-23)

- Fix (`PlusMenuComponent`): use inline style instead of HostBinding to be compatible when Ivy is off
- Fix (`ProgressSpinnerComponent`): use inline style instead of HostBinding to be compatible when Ivy is off

## 35.2.0 (2021-03-16)

- Enhancement: Add Dropzone component
- Enhancement: Provide services in root injector
- Fix (`FileButtonComponent`): change id to be unique

## 35.1.2 (2021-03-15)

- Chore: Re-publish master on npm `latest` channel. No changes

## 35.1.1 (2021-03-10)

- Bug (`ngx-progress-spinner`): Fix issue with later versions of SASS

## 35.1.0 (2021-02-26)

- Feature (`ngx-section`): Add `None` toggle position
- Feature: Add `appearance` to `ProgressSpinnerComponent` where default is no icon
- Feature: Add failure state and failure icon to `ProgressSpinnerComponent`
- Feature: Add an option to add label to `ProgressSpinnerComponent`
- Fix: Bug (`ngx-section`): Make toggle on header click optional

## 35.0.1 (2021-02-24)

- Fix (`ngx-card`/`ngx-section`): User supplied classes are not preserved in some cases using `HostBinding`

## 35.0.0 (2021-02-22)

- Feature: Add an option to add `color` to `items` in `PlusMenuComponent`
- Feature: Add `appearance` input to CardComponent
- Feature: Add `appearance` and `togglePosition` inputs to `SectionComponent`
- Feature: Add `timeout` option to `ButtonComponent`
- Enhancement: Add `hideAccent` input to CardComponent
- Enhancement: When `sectionCollapsible` in `SectionComponent` is true, make the section header clickable to expand and
  collapse
- Fix (`ngx-input`): Make the lockpad button clickable when the textbox appearance is set to "Fill" and
  has `[unlockable] = "true"` set. Also fix vertical alignment.

## 34.1.0 (2021-01-20)

- Enhancement: Add `blur` and `dateTimeSelected` outputs to `DateTimeComponent`.
- Enhancement: Add `showIcons` input to `ToggleComponent` to display optional icons.
- Fix (`JsonEditor`): Remove unnecessary `onModelChange` event emissions on init.
- Fix (`json-editor`): allow 'null' type in schema.

## 34.0.1 (2020-12-17)

- Fix (`ngx-plus-menu`): classes not set correctly in some cases.

## 34.0.0 (2020-12-17)

- Fix (`DateTime`): Component no longer emits a `(change)` event when input value is invalid.
- Fix (Da`teTime): Display value not updated correctly.
- BREAKING (`ngx-plus-menu`): items now contain `title` and `subtitle`. Does not setup it's own hotkeys.
- Fix (`ngx-plus-menu`): no popup us shown if `menuTitle` is not passed as an input to `ngx-plus-menu`

## 33.1.0 (2020-12-14)

- Feature: add `groupByTemplate` Input to `ngx-select`.
  Check [Selects Documentation](https://swimlane.github.io/ngx-ui/selects) for usage

## 33.0.0 (2020-12-8)

- BREAKING: An empty value will no longer cause the `DateTimeComponent` to become invalid, unless it is explicitly
- Feature: add `ngx-plus-menu`
- Enhancement: Add `required` and `requiredIndicator` inputs to `DateTimeComponent`.
  marked as `required`.
- Enhancement (`Stepper`): Add `[large]` input to increase the default icon size.
- Enhancement (`Stepper`): Add `[trackBar]` input to make track bar optional.
- Enhancement (`Stepper`): Add `[progress]` input to show a progress indicator on the active step.
- AdEnhancementded (`Stepper`): Add `[removeHighlight]` input to remove highlight color for the completed steps.
- Enhancement (`Stepper`): Add `[icon]` input to show an icon instead of the step number.
- Enhancement (`Stepper`): Add `.complete()` method to complete every step (including the last one).
- Fix: remove hover state on ngx-card and fix minor style issues

## 32.0.0 (2020-11-24)

- Enhancement: ngx card component

## 31.1.0 (2020-11-10)

- Fix: re-infer `json-editor` node types after model change
- Fix: Reference leak caused when duplicating field names on a object
- Enhancement: Add `[withMargin]` option to `ngx-input`
  - `[withMargin]` allows for consumers of `ngx-input` to remove the vertical margins that are added by the `ngx-input`
    itself, to take control of positioning of the `ngx-input`.
  - Default is `true` to keep the current behavior intact.
- Enhancement: Add `[withMargin]` option to `ngx-date-time`
  - `[withMargin]` on `ngx-date-time` is passed down to `ngx-input` resulting the above points.
  - Default is `true` to keep the current behavior intact.
  - `[withMargin]=true` adds `.marginless` CSS class to determine the `translateY` value of `calendar-dialog-btn`
    relative to the Host component.
- Enhancement: Remove `padding-top` style to `ngx-input` if there's no `label` passed in.
  - For `ngx-date-time`, **calendar toggle button** is positioned properly with no `label`.
- Enhancement: Port `AutoSizeInputDirective` from `ngx-autosize-input` to `ngx-ui` because of bad implementation on
  first `ngModel.valueChanges` in `ngx-autosize-input`.
- Chore: Remove `ngx-autosize-input` as a dependency.

## 31.0.1 (2020-11-03)

- Fix: Change \* imports to a namespaces compatible version

## 31.0.0 (2020-10-29)

- BREAKING: `JsonEditor` components `@Output() schemaChange` was renamed to `schemaUpdate`.
- Feature: Add `confirmButtonText` and `cancelButtonText` config options (`<ngx-alert-dialog />`).
- Enhancement: Performance improvements.
- Enhancement: Add `[unlockable]` option to InputComponent.
- Fix: Select not auto-collapse when click on caret.
- Fix: DateTimeComponent displaValue.
- Fix: Protect against unwanted schema changes when using Two-way binding outside of schema-builder mode.

## 30.1.0 (2020-09-22)

- Bug: Revert removal of ngx-datatable styles

## 30.0.0 (2020-09-18)

- BREAKING: Upgrade to Angular 10
- Chore: Removed ngx-datatable from demo page
- Enhancement: Added icons; update icon style for `calendar-clock` and `calendar` icons (#491)
- Enhancement: replace the default chrome accessibility number spinner with a styled one for number type ngx-inputs
- Enhancement: added a minWidth input property to ngx-input
- Enhancement: Updated ngx-date-time component to have fill variants and autosize option
- Fix: Fix ngx-select issue when using the filter and arrow keys/enter to selecting a dropdown option (#494)
- Fix: rework the way autosize works on ngx-input so that it sizes to its content correctly. Now using
  ngx-autosize-input library.

## 29.3.0 (2020-08-17)

- Enhancement: update `ngx-select` focus underline to be clearer. clicking the input box now also toggles dropdown
- Bug: fix `ngx-select` so that clicking the caret closes the dropdown

## 29.2.3 (2020-08-14)

- Fix: refactor ngx-select fill css to use proper css ordering and not rely on important keyword
- Bug: fix ngx-button issue related to the promise input

## 29.2.2 (2020-08-11)

- Fix: Export TipComponent and TipModule

## 29.2.1 (2020-07-24)

- Bug: fix ngx-input/ngx-select host class syntax for prod builds
- Bug: fix navbar background color to be solid and match UX

## 29.2.0 (2020-07-23)

- Feature: support `cssClass` in alert/config options
- Feature: ngx-tip component
- Feature: autosize input width
- Feature: fill input style
- Feature: sm, md, lg input sizing
- Bug: make context drawer compatible with components
- Bug: fix ngx-drawer-content scrolling scss issue
- Feature: fill select style
- Enhancement: select dropdown styling

## 29.1.0 (2020-06-29)

- Feature: Show step labels in horizontal stepper
- Bug: Make `SplitDirective#resize` public again

## 29.0.0 (2020-06-15)

- BREAKING: `ngxSplit` directives no longer require, nor support, `@angular/flex-layout` directives
- Enhancement: Remove @angular/flex-layout
- Enhancement: Added `ngx-flex` classes for easy flex layouts

## 28.7.0 (2020-06-15)

- Feature: allow showing all object properties by defualt
- Feature: Source Sans Pro fonts now defined with `font-display: swap` for better UX
- Fix: Text inputs in flat JSON editor now trigger validation on change.
- Fix: various alignment issues in flat JSON editor

## 28.6.3 (2020-06-04)

- Fix: resize-overlay component css leak issues
- Fix: Allow add new value on selects when filter query matches some options (#451)

## 28.6.2 (2020-05-29)

- Fix: errors in flat JSON editor not being updated on changes

## 28.6.1 (2020-05-29)

- Feature: support dynamic `hideRoot` inputs
- Fix: required icon not showing for top level when `hideRoot` is true

## 28.6.0 (2020-05-07)

- Feature: New ngx-navbar component (#437)
- Fix: Update tab buttons when disabled input changes on ngx-tab (#438, fixes #436)
- Fix: allow null values from numeric ngx-inputs (#440)
- Fix: ngx-select Set touched value inside onTouchedCallback (#441)

## 28.5.7 (2020-04-24)

- Fix: Remove `HTTPClientModule` from `IconModule` (See angular/angular#20575 for details)

## 28.5.6 (2020-04-23)

- Fix: recursive tree expand and collpase (#434)
- Update public_api.ts (#433)

## 28.5.5 (2020-04-21)

- Chore: Update angular to 9.1.2 (#431)
- Support tabindex on select inputs (#429)

## 28.5.4 (2020-04-20)

- Fix ngx-select not registering onTouched events (#427)

## 28.5.3 (2020-04-14)

- Chore: Update dependecies
- Fix nag animation (#423)
- Allow side effects to fix JSON tree (#424)

## 28.5.2 (2020-04-02)

- Export utils (#419)

## 28.5.1 (2020-04-01)

- Bugfix/remove-barrels (#416)
- ngx-select bug: do not make it invalid when untouched (#407)

## 28.5.0 (2020-03-20)

- Feature automation and automation-related icons #415
  (#413)

## 28.4.3 (2020-03-19)

- Resize-overlay Component Fixes (#413)

## 28.4.3 (2020-03-18)

- Resize-overlay Component (#411)

## 28.4.2 (2020-03-09)

- JSON editor bug fixes (#404)

## 28.4.1 (2020-03-05)

- JSON editor bug fixes (#400, #402)

## 28.4.0 (2020-03-03)

- Enhancement: Updates icons (#401)

## 28.3.0 (2020-02-20)

- Enhancement: delay closeOnMouseLeave in dropdown. (#397)
- Fix: move click event on tree node to avoid propagation (#398)

## 28.2.0 (2020-02-18)

- Enhancement: Json Editor Schema Builder: hide root node (#391)
- Enhancement: Add showEvent to dropdown component (#384)
- Enhancement: Json Editor Schema Builder: Support edit of root object (#388)
- Fix: fix initial value = 0 bug on slider component (#392)

## 28.1.0 (2020-02-10)

- Enhancement: Add showEvent to dropdown component (#384)
- Enhancement: Json Editor Schema Builder: Support edit of root object (#388)
- Enhancement: Expose schema on property delete and update demo page (#386)
- Fix: Fix readonly styles (#390)
- Fix: Fix/tree icons (#389)

## 28.0.0 (2020-02-07)

- Chore: Bump dependencies to angular 9.0.0

## 28.0.0-rc.9 (2020-02-06)

- Enhancement: Add selectable and disabled to tree node model (#377)
- Enhancement: progress spinner (#382)
- Enhancement: round checkbox (#381)
- Enhancement: ngx stepper (#380)
- Enhancement: json editor examples placeholder (#376)
- Fix: #372 - fix button styling on .ngx-tabs (#372)
- Chore: reorganize animations (#378)

## 28.0.0-rc.8 (2020-01-23)

- Enhancement: Allow setting of tree component icons (#370)
- Enhancement: Allow passing tree node to node template in tree component (#370)

## 28.0.0-rc.5 (2020-01-13)

- Enhancement: Allow view container injection (#360)
- Fix: Do length check on toolbar menu items (#362)
- Fix: Refactor PatternValidatorModule to fix import (#363)
- Chore: Make flex-layout a peer, not dependency (#361)

## 28.0.0-rc.4 (2020-01-09)

- BREAKING: Change components to ChangeDetectionStrategy.OnPush

## 28.0.0-rc.3 (2019-12-02)

- Fix: Extract template into separate file

## 28.0.0-rc.2 (2019-12-02)

- Fix: Properly import coerce-boolean

## 28.0.0-rc.1 (2019-11-29)

- BREAKING: Update angular to 9.0.0-rc.4
- BREAKING: Change Input component to ChangeDetectionStrategy.OnPush (#317)
- BREAKING: Change Checkbox component to ChangeDetectionStrategy.OnPush (#308)
- BREAKING: Change Code editor component to ChangeDetectionStrategy.OnPush (#316)
- Feature: Add token hints to `ngx-codemirror`
- Feature: Add ability to define custom template for tab header (#303)
- Bug: Fix bugg for look that failed to manipulate array properly (#313)

## 27.1.0 (2019-10-28)

- Enhancement: Change InjectionService to use portals (#309)
- Enhancement: Aacebo/button on push (#306)
- Fix: Fix changed after check error (#310)
- Chore; Remove codeclimate config file. Update readme (#311)

## 27.0.0 (2019-09-30)

- BREAKING: Update to be compatible with Ivy (#304)
- Feature: Codemirror hint (#298)
- Fix: Update scrollbars (#300)
- Chore Remove iterable-map, fix decamelize typo, add pipes demo page (#293)
- Demo: Add ability to search for specific components from the sidebar. (#299)
- Demo: Update codemirror code for drawer and dialog to reflect view child static setting needed (#301)

## 26.0.1 (2019-06-12)

- Fix: Fix tree templates (#292)

## 26.0.0 (2019-06-10)

- BREAKING: Upgrade to angular 8 (#288)
- Enhancement: Support allowIn in hotkeys (#291)

## 25.11.0 (2019-05-29)

- Enhancement: Add radar chart icon (#289)

## 25.10.0 (2019-05-23)

- Enhancement: Add pattern validtor (#286)
- Enhancement: Add back filled and forward arrows (#285)

## 25.9.0 (2019-05-16)

- Enhancement: Add ngx-speedometer and ngx-runner icon namespaces (#279)
- Enhancement: Add action, condition, undo, redo, undo-all, redo-all icons (#280)
- Chore: Update slider demo (#276)

## 25.8.0 (2019-04-23)

- Enhancement: add longPress option to alert confirmation (#275)
- Fix: aot build (#274)

## 25.7.0 (2019-04-04)

- Fix: Datepicker expands downwards instead of upwards (#265)
- Chore: Sass variables rearranged so color values may be imported without also importing rules (#273)

## 25.6.3 (2019-03-19)

- Fix: `ngx-calendar` prevent entering an hour of 12 causing AM/PM rollover

## 25.6.2 (2019-03-19)

- Fix: `ngx-calendar` Allow string values of min and max, validate date (#267)
- Fix: `ngx-date-time` AM reverting to PM, set correct max/min for hours/mins (#268)

## 25.6.1 (2019-03-18)

- Enhancement: add fade-out to "current" button in `ngx-date-time` (#261)
- Fix: JSON editor issues (#266)
- Fix: add overflow to notification content (#263)
- Chore: Add Karma tests (#264)

## 25.6.0 (2019-03-12)

- Feature: `ngx-date-time` add leading 0 in minutes input (#258)
- Feature: `ngx-date-time` hide 'current' when it's current date time (#257)
- Feature: Add support for multiple types for arrays in JSON editor (#251)
- Fix: Replace `(select)` event on tree and tabs components (#249)
- Fix: `ngx-split-area` extra null check. (#256)
- Fix: Replace title attribute on tabs and toolbar components (#246)
- Fix: Prevent line breaks in json editor (#260)

## 25.5.2 (2019-03-11)

- Fix: `ngx-date-time` more issues related to change events causing input text to change while typing.
- Fix: `ngx-date-time` default `format` not being applied.
- Fix: `ngx-date-time` issues with AM button in dialog acting like a toggle.
- Fix: `ngx-calendar` year view is off by one when year is a century

## 25.5.1 (2019-03-08)

- Fix: `ngx-date-time` only update input on blur, prevents changes while typing
- Fix: Replace title attribute on tabs and toolbar components (#246)

## 25.5.0 (2019-03-07)

- Fix: `ngx-date-time` picker should emit `(ngModelChange)` on change instead of on blur by default
- Fix: `ngx-date-time` should default to correct format
- Feature: `ngx-date-time` respects `ngModelOptions`
- Feature: Support hidden attribute on select option (#247)

## 25.4.0 (2019-03-05)

- Feature: Support schemas with multiple types on JSON editor (#244)

## 25.3.2 (2019-03-04)

- Fix: buttons should not be transparent while showing status

## 25.3.1 (2019-02-28)

- Republish: bad build

## 25.3.0 (2019-02-28)

- Feature: New icons (`ngx-key`, `ngx-photo`, `ngx-mfa`) (#239, #241)

## 25.2.1 (2019-02-18)

- Fix: Fixes bug where changing the direction of `ngxSplit` will break the layout (#236)
- Fix: Set toggle value to false if undefined (#232)

## 25.2.0 (2019-02-14)

- Feature: Adds month and year calendar views.

## 25.1.1 (2019-02-11)

- Fix: Fixes `ngx-date-time` component throwing an error when format is undefined.
- Fix: `ngx-tabs` now have a `(selectTab)` output to avoid conflict with `(select)`.
- Fix: `ngx-input` now implements `setDisabledState` per `ControlValueAccessor` interface

## 25.1.0 (2019-01-30)

- Fix: ngx-date-time now emits values even if date is invalid (emits a string of user input in those cases)
- Fix: ngx-date-time are validated on first value.
- Feature: ngx-date-time `precision` input sets rounding precision for input/output.
- Feature: ngx-date-time no longer changes input to "Invalid Date" when typing an invalid date.

## 25.0.0 (2019-01-28)

- BREAKING: @angular/flex-layout must be imported in the modules it's used in - it is no longer imported in the
  main `NgxUIModule` (#217)
- Fix: Fixes circular dependency warnings and the AoT build (#217)
- Fix: Fixes an error in the splitter component (#219)

## 24.1.1 (2019-01-23)

- Fix: `ngx-date-time` now accepts null values as blank dates

## 24.1.0 (2019-01-18)

- Feature: Support parsing formats for `ngx-date-time` and `ngx-calendar`
- Fix: `ngx-date-time` now displays hint line only once
- Fix: min/max dates for `ngx-date-time` are now inclusive as intended
- Fix: date selection in `ngx-date-time` dialog are now validated
- Fix: `ngx-date-time` now updates if format changes from input
- Fix: fixes issues where `ngx-date-time` does clear in some cases
- Fix: time in `ngx-calendar` is preserved when changing months

## 24.0.1 (2019-01-14)

- Fix: `amTimeZone` pipe now displays blank if input is undefined

## 24.0.0 (2019-01-14)

- BREAKING: now requires `moment-timezone`
- Feature: Add `amTimeZone` pipe for timezone display
- Feature: Support timezone input for `ngx-date-time`
- Feature: Support timezone input for `ngx-calendar`

## 23.0.0 (2018-12-31)

- BREAKING: ngx-select filtering is now case sensitive (#211)
- Feature: added `[filterCaseSensitive]` input to ngx-select
- Feature: added code editor component to JSON editor (#212)
- Bug: Fixed several issues in JSON editor (#212)

## 22.2.0 (2018-12-11)

- Feature: Adds `ngx-action-maximize-inverse` icon (#210)

## 22.1.1 (2018-12-10)

- Fix: Remove background color from `button` elements inside `.ngx-button`

## 22.1.0 (2018-12-07)

- Feature: Add JSON editor component (#206)
- Fix: Add `[*.css]` in pkg.sideEffects to fix tree shaking issues in bundlers like Webpack

## 22.0.2 (2018-11-27)

- Fix: Update packages to address security vulnerability in flatmap-stream and event-stream

## 22.0.1 (2018-11-01)

- Fix: Remove `HTTPClientModule` from `IconModule` (#205)

## 22.0.0 (2018-10-29)

- BREAKING: Upgrade to Angular 7

## 21.7.0 (2018-10-16)

- Enhancement: Add ES Module Support (#201)

## 21.6.0 (2018-10-09)

- Feature: Add dialog action icon for restore minimized window

## 21.5.0 (2018-10-08)

- Bug: patch async issue in dialog service
- Feature: new action icons

# 21.4.4 (2018-08-29)

- Bug: Timeout the overlay component to prevent expression changed after check errors (#195)

# 21.4.3 (2018-08-28)

- Bug: Fixes error being thrown in select validation if value is null (#194)

# 21.4.2 (2018-08-21)

- Bug: Fix min/max validation in numeric inputs (#193)

# 21.4.1 (2018-08-09)

- Bug: Fixed ng-invalid expression changed issue (#192)

# 21.4.0 (2018-08-08)

- Enhancement: Improvments to ngx-select (#186)
- Enhancement: Various dropdown styles (#188)
- Enhancement: Improved slider (#182)
- Enhancement: Added icons (#191)
- Bug: Improved invalid state for ngx-input (#189)

# 21.3.0 (2018-07-10)

- Enhancement: Added icons

# 21.2.1 (2018-06-30)

- Fix: scope icons under `.ngx-icon` class

# 21.2.0 (2018-06-28)

- Enhancement: Added icons
- Chore: Updated demo page
- Chore: Updated tests

# 21.1.2 (2018-05-22)

- Bug: Move dialog close button back to proper position

# 21.1.1 (2018-05-21)

- Enhancement: Navigation style changes

# 21.1.0 (2018-05-18)

- Feature: Add new ngx-nav-menu component (#179)
- Enhancement: Add branching icons (#175)
- Enhancement: Add `getRootViewContainerNode` to `InjectionService` (#177)
- Bug: Fix close button not visible in dialogs
- Bug: Fix bolded ngx-icons inside of buttons

# 21.0.0 (2018-05-06)

- BREAKING: Upgrade to Angular 6

# 20.2.1 (2018-04-27)

- Enhancement: Added several new icons
- Enhancement: Added common animations

# 20.2.0 (2018-04-06)

- Feature: Added `clearInput` function on file button (#166)
- Bug: Fix ngx-file-upload-button in non-Chrome browsers (#169)
- Chore: Bumped dependencies (#167)
- Chore: Set up cypress testing framework (#168)

# 20.1.1 (2018-02-19)

- Bug: Fix default long-press button icon

# 20.1.0 (2018-02-14)

- Feature: added radio button and radio button group (#158)
- Feature: Add glow styles
- Feature: Add full screen dialog styles (#157)
- Bug: Fix icons not displaying properly on Windows (#156)
- Chore: Export all components (#159)

# 20.0.1 (2018-02-07)

- Bug: Fix button icon size

# 20.0.0 (2018-02-06)

- BREAKING: Changed icon classes (#150)
- Enhancement: Added new icons (#150)
- Bug: Added `nullcheck` in `showTooltip` to check whether element still exists (#152)
- Bug: Fixed undefined values in selection model (#153)
- Bug: Fixed double id on password input element (#155)

# 19.2.0 (2017-12-11)

- Bug: Ensure calender and date/time values match selections
- Enhancement: Add new icons

## 19.1.1 (2017-12-11)

- Bug: Ensure calender and date/time values match selections
- Bug: Fix bug where overriding long-press-button state would not persist

## 18.4.1 (2017-12-11)

- Bug: Ensure calender and date/time values match selections
- Bug: Fix bug where overriding long-press-button state would not persist

## 19.1.0 (2017-12-01)

- Feature: Added long-press directive
- Feature: Added ngx-long-press-button component
- Icon: Added mouse icon
- Enhancement: Added option for multiple file selection (#140)

## 18.4.0 (2017-12-01)

- Feature: Added long-press directive
- Feature: Added ngx-long-press-button component
- Icon: Added mouse icon

## 19.0.1 (2017-11-16)

- Chore: added "annotationsAs": "decorators" to angular compiler options for AOT

## 19.0.0 (2017-11-14)

- BREAKING: Upgraded to angular 5 (#135)
- Feature: Added light and light italic fonts (#134)
- Improvement: Update tooltip styles (#130
- Improvement:
- Bug: Dropdown: Use HostBinding and toggle event instead of renderer (#129)
- Chore: allow submodule-imports in tslint rule (#127)

## 18.2.0 (2017-10-13)

- Feature: ngx-nag
- Feature: Custom scrollbars
- Feature: Added showCaret input to dropdowns
- Feature: Added alert and down (arrow) icons
- Feature: Added button size classes
- Improvement: Restyled alerts
- Improvement: Restyled dialog
- Improvement: Restyled calendar
- Improvement: Restyled tags
- Improvement: Improved performance and AoT for ngx-inputs
- Bug: Fixed `ExpressionChangedAfterItHasBeenCheckedError`
- Bug: Using consistent colors for placeholders
- Removed unused and outdated logo icon

## 18.1.0 (2017-09-21)

- Feature: Added optional `ngxIfTabActive` directive (#108)
- Feature: Added `closeOnOutsideClick` input to dropdowns (#112)
- Bug: Using consistent colors for placeholders (#110)
- Bug: Fixed overflapping labels and placeholders
- Chore: Removed unused and outdated logo icon (#111)
- Chore: Improved performance and AoT for ngx-inputs (#109)
- Docs: Fixed dialog component demo (#113)

## 18.0.6 (2017-08-23)

- Chore: Removed deprecated API for v5 prep
- Chore: Upgrade all depedencies

## 18.0.5 (2017-08-23)

- Bug: Tooltip closing when it shouldn't

## 18.0.4 (2017-08-14)

- Feature: Blur events on code editor

## 18.0.3 (2017-08-14)

- Bug: Hint content projection not working

## 18.0.2 (2017-08-08)

- Bug: Toggle default value causing form to be dirty

## 18.0.1 (2017-08-02)

- Bug: Buttons hover on highlight
- Bug: Remove left/right margin from buttons
- Bug: Clicking on tooltip parent causes tooltip to hide
- Bug: Input animation not always triggering
- Bug: Outline on Inputs show on Email/Url/Tel types only

## 18.0.0 (2017-07-26)

- Chore: Upgrade to new HTTP Module

## 17.2.11 (2017-07-24)

- Fix: display correct mod key on PC

## 17.2.10 (2017-07-24)

- Bug: Tabs with nested component that have animations don't render correctly

## 17.2.9 (2017-07-20)

- Fix: Ensure form controls scale with font size
- Fix: align placeholders in ngx-input and ngx-select
- Fix: fixed icons that were not displayed correctly in windows
- Fix: removed svg metadata

## 17.2.8 (2017-07-14)

- Fix: Updated ngx-select style, ensured alignment with ngx-inputs
- Fix: Allow multiline hints in ngx-select and ngx-input
- Fix: Make hotkey's help more visible

## 17.2.6 (2017-07-14)

- Bug: AoT Fixes

## 17.2.5 (2017-07-14)

- Bug: AoT Fixes

## 17.2.4 (2017-07-14)

- Bug: AoT Fixes

## 17.2.3 (2017-07-14)

- Bug: AoT Fixes

## 17.2.2 (2017-07-13)

- Bug: Fixed bug in validators that prevented type attribute on ngx-inputs (again)

## 17.2.1 (2017-07-12)

- Bug: Fixed bug in validators that prevented type attribute on ngx-inputs

## 17.2.0 (2017-07-12)

- Feature: add min and max validators for `ngx-input[type=number]`
- Bug: fix bug where notification container reference would still be present after being removed from the DOM

## 17.1.0 (2017-07-10)

- Feature: add `pauseOthers` and `unpauseOthers` to hotkeys service
- Bug: fixed spacing for date and time fields
- Bug: `focusedOrDirty` getter now valid for numeric inputs to ngx-input

## 17.0.3 (2017-07-06)

- Bug: Fix button not being full width

## 17.0.1, 17.0.2 (2017-07-06)

- Feature: AoT Packaging

## 17.0.0 (2017-07-06)

- Feature: support px basis for `ngx-splitter`
- BREAKING: `[minAreaPct]` and `[maxAreaPct]` inputs on `ngxSplitArea` are now `[minBasis]` and `[maxBasis]`

## 16.7.0 (2017-07-05)

- Feature: Add input prefix/suffix

## 16.6.0 (2017-07-03)

- Feature: added toggle event output to ngx-select
- Fix: updated preloader to respond during JS load, #68
- Fix: ensure form elements have correct margin and padding per material design spec

## 16.5.0 (2017-06-28)

- Fix: Consistent alignment, colors, and font sizes for ngx-select and ngx-input
- Feature: added hint input to ngx-select
- Feature: new icons: reference-\*, select-user, select-users
- Fix: fixed history icon
- Bug: Fix for toggle button id's colliding with inputs
- Feature: allow `disableDropdown` in ngx-select
- Feature: new icons: reference-\*, select-user, select-users
- Fix: fixed history icon
- Bug: progress icon not aligned in some cases
- Feature: added spreadsheet mode to `ngx-codemirror`
- Bug: fixed `ngx-codemirror` elements without children appearing as 'undefined' in code-editor.

## 16.4.1

- Bug: Splitter not working all the time
- Bug: Button position fixes

## 16.4.0

- Feature: Add `autoSelect` on focus to inputs
- Chore: Upgrade webpack and add new optimizations

## 16.3.2

- Feature: Add file upload button error event

## 16.3.0

- Feature: Redesign notifications component
- Feature: Allow notifications to accept custom icons
- Bug: Improve colors and icon sizes in buttons

## 16.2.0

- Bug: run hotkey callbacks in zone
- Icon: html-code icon.
- Bug: Fixed empty strings appearing as 'undefined' in code-editor.
- Icon: Updated and add various icons
- Feature: Implemented progress spinner
- Chore: Bump Angular Version

## 16.1.5, 16.1.4, 16.1.3

- Bug: Hotkeys this is static not instance

## 16.1.2

- Bug: Hotkeys this is static not instance

## 16.1.1

- Bug: Fixed for Hotkey decorator not being exported through the module.
- Bug: Fixed sorting of display label in hotkeys

## 16.1.0

- Feature: Implemented hotkeys service and component
- Enhancement: Replaced user and lock icons
- Enhancement: New icons: star, star-filled, back-arrow, mail
- Bug: Fix for toggle button id's colliding with inputs
- Bug: Fixed unable to clear tags when using identifiers in ngx-select

## 16.0.2

- Icon: Add new builder, workflow, integrations and reports icons
- Fix: Fixed bug where horizontal splitters were using parent width
- Feature: Splitter now respects grow and shrink values in flex-layout
- Feature: Modified the method for distributing size changes

## 16.0.1

- Icon: Add handle icon
- Bug: Fix header buttons having same color as background

## 16.0.0

- BREAKING: Update `AlertService` to return type in addition to data
- Feature: Add `[minAreaPct]` and `[maxAreaPct]` inputs to `ngxSplitArea`
- Feature: Add double-click event to ngx-split-handle component
- Feature: Add double click split handle to snap to extremes
- Bug: Each ngxSplit now only listens to direct child ngx-split-handles
- Feature: Add `(dragStart)` and `(dragEnd)` outputs

## 15.0.3

- Enhancement: Add code folding plugins
- Style: Fix various styles to be consistent w/ designs
- Fix: remove resize-handle.svg

## 15.0.2

- Enhancement: Reintroduce text colors.
- Style: Fix various styles to be consistent w/ designs

## 15.0.1

- Enhancement: Improved animations
- Bug: Fix dialog key enter/escape not working at top level
- Bug: Fix everything "scrollbarized"
- Style: Fix various styles to be consistent w/ designs

## 15.0.0

- BREAKING: New color weight system and shade definitions
- Enhancement: Added extra icons
- Style: Fix various styles to be consistent w/ designs

## 14.4.0

- Feature: Add next/prev methods on Tabs component.
- Feature: Allow content in Overlay component.
- Style: Fix various styles to be consistent w/ designs

## 14.3.8

- Style: Fix dropdown styles

## 14.3.7

- Bug: Drag handles observing all descendants
- Style: Fix button styles to be consistent w/ designs

## 14.3.6

- Bug: Rework drag handle

## 14.3.5

- Chore: Update flex layout

## 14.3.2, 14.3.3, 14.3.4,

- Bug: Fix split host css class overriding defaults

## 14.3.1

- Bug: Fix input spacing

## 14.3.0

- Feature: Splitter

## 14.2.4

- Bug: Fix drawer animations

## 14.2.3

- Enhancement: Added exit animation to drawers
- Bug: Fixed sizing bug in `DrawerService`

## 14.2.0

- Enhancement: Added ability to hit enter/escape in prompt dialogs
- Enhancement: Added extra icons
- Chore: Update @angular/flex-layout to 2.0.0.beta-7

## 14.1.0

- Feature: Added ngx-button component

## 14.0.0

- BREAKING: Upgrade to Angular4

## 13.3.1

- Chore: Update ng2-file-upload to 1.2.0

## 13.3.0

- Enhancement: Updated checkbox style
- Enhancement: Added dropzone template to file upload button component
- Enhancement: Added support for min and max length for ngx-input

## 13.2.7

- Chore: Update icon names

## 13.2.6

- Chore: Upgrade @angular/flex-layout to 2.0.0.rc-1

## 13.2.5

- Icon: Add `icon-lock-2` and `icon-user-2`

## 13.2.4

- Bug: Hide overflow text in toolbar title

## 13.2.3

- Enhancement: Change header colors of sections and tables
- Enhancement: Add padding input to sections

## 13.2.2

- Bug: Fixed toggles requiring double click to change state
- Bug: Fix overlay z-index
- Bug: Fix clicking overlay closing multiple components

## 13.2.1

- Enhancement: Export services through main module
- Bug: Do not throw an error when the cancel button is clicked on dialogs

## 13.2.0

- Enhancement: JSON Pipe

## 13.1.0

- Enhancement: Add labels to select

## 13.0.1

- Bug: Fix calendar row alignment
- Icon: Add scatter plot icon

## 13.0.0

- BREAKING: Add `context` object to drawer in place of just manager being passed

## 12.1.1

- Style: Add top bulb to tree
- Bug: Add cursor to selectable tree nodes
- Bug: Disable tree selection when disabled

## 12.1.0

- Feature: Search in code editor
- Feature: Tree Component
- Bug: Fix file upload button having extra padding

## 12.0.0

- Bug: Fix Pipes module import issues
- Chore: New build system includes TS Types \* still no AoT though

## 11.6.1

- Bug: Remove duplicate momentjs
- Bug: Fix spacing on button on date time picker
- Bug: Fix overflow text of select options
- Bug: Fix width of select dropdown
- Bug: Fix margin not applied correctly in dialogs

## 11.6.0

- Feature: Add new on single select
- Bug: Fix spacing on single select values

## 11.5.0

- Bug: Remove Textarea resize handle
- Bug: Fix toolbar title overflow issue

## 11.4.0

- Feature: Textarea Input with Autogrow
- Chore: Update Angular to 2.4.5

## 11.3.0

- Feature: Loading Bar Component

## 11.2.0

- Feature: Visibility directive
- Bug: Fix code editor not sizing correct on load if hidden

## 11.1.0

- Feature: Alert/Confirm/Prompt Dialogs

## 10.0.0

- BREAKING: Removing code highlighter
- Feature: Add ability to inline code editor contents
