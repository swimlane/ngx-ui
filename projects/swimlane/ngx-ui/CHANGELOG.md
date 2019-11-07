# CHANGELOG

## HEAD (Unreleased)

- Feature: Add token hints to `ngx-codemirror`
- Enhancement: Add support for templates in tab headers (#302)

## 27.1.0 (2019-10-28)

- Enhancement: Change InjectionService to use portals (#309)
- Enhancement: Aacebo/button on push (#306)
- Fix: Fix changed after check error (#310)
- Chore; Remove codeclimate config file. Update readme (#311)

## 27.0.0 (2019-09-30)

- Breaking: Update to be compatible with Ivy (#304)
- Feature: Codemirror hint (#298)
- Fix: Update scrollbars (#300)
- Chore Remove iterable-map, fix decamelize typo, add pipes demo page (#293)
- Demo: Add ability to search for specific components from the sidebar. (#299)
- Demo: Update codemirror code for drawer and dialog to reflect view child static setting needed (#301)

## 26.0.1 (2019-06-12)

- Fix: Fix tree templates (#292)

## 26.0.0 (2019-06-10)

- Breaking: Upgrade to angular 8 (#288)
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

- Breaking: @angular/flex-layout must be imported in the modules it's used in - it is no longer imported in the main `NgxUIModule` (#217)
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

- Breaking: now requires `moment-timezone`
- Feature: Add `amTimeZone` pipe for timezone display
- Feature: Support timezone input for `ngx-date-time`
- Feature: Support timezone input for `ngx-calendar`

## 23.0.0 (2018-12-31)

- Breaking: ngx-select filtering is now case sensitive (#211)
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

- Fix: Remove `HTTPClientModule` from `IconModule` (#204)

## 22.0.0 (2018-10-29)

- Breaking: Upgrade to Angular 7

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

- Breaking: Upgrade to Angular 6

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

- Breaking: Changed icon classes (#150)
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

- Breaking: Upgraded to angular 5 (#135)
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
- Breaking: `[minAreaPct]` and `[maxAreaPct]` inputs on `ngxSplitArea` are now `[minBasis]` and `[maxBasis]`

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

- Breaking: Update `AlertService` to return type in addition to data
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

- Breaking: New color weight system and shade definitions
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
