CHANGELOG
=========

## HEAD (Unreleased)

--------------------

## 18.4.1 (2017-12-11)
* Bug: Ensure calender and date/time values match selections
* Bug: Fix bug where overriding long-press-button state would not persist

## 18.4.0 (2017-12-01)
* Feature: Added long-press directive
* Feature: Added ngx-long-press-button component
* Icon: Added mouse icon

## 18.3.0 (2017-11-16)
* Feature: Add new color gradiants
* Fix: Nag component stateChanged -> stateChange
* Feature: Fixed disable component colors
* Feature: Added light and light italic fonts

## 18.2.0 (2017-10-13)
* Feature: ngx-nag
* Feature: Custom scrollbars
* Feature: Added showCaret input to dropdowns
* Feature: Added alert and down (arrow) icons
* Feature: Added button size classes
* Improvement: Restyled alerts
* Improvement: Restyled dialog
* Improvement: Restyled calendar
* Improvement: Restyled tags
* Improvement: Improved performance and AoT for ngx-inputs
* Bug: Fixed ExpressionChangedAfterItHasBeenCheckedError
* Bug: Using consistent colors for placeholders
* Removed unused and outdated logo icon

## 18.1.0 (2017-09-21)
* Feature: Added optional ngxIfTabActive directive (#108)
* Feature: Added closeOnOutsideClick input to dropdowns (#112)
* Bug: Using consistent colors for placeholders (#110)
* Bug: Fixed overflapping labels and placeholders
* Chore: Removed unused and outdated logo icon (#111)
* Chore: Improved performance and AoT for ngx-inputs (#109) 
* Docs: Fixed dialog component demo (#113)

## 18.0.6 (2017-08-23)
* Chore: Removed deprecated API for v5 prep
* Chore: Upgrade all depedencies

## 18.0.5 (2017-08-23)
* Bug: Tooltip closing when it shouldn't

## 18.0.4 (2017-08-14)
* Feature: Blur events on code editor

## 18.0.3 (2017-08-14)
* Bug: Hint content projection not working

## 18.0.2 (2017-08-08)
* Bug: Toggle default value causing form to be dirty

## 18.0.1 (2017-08-02)
* Bug: Buttons hover on highlight
* Bug: Remove left/right margin from buttons
* Bug: Clicking on tooltip parent causes tooltip to hide
* Bug: Input animation not always triggering
* Bug: Outline on Inputs show on Email/Url/Tel types only

## 18.0.0 (2017-07-26)
* Chore: Upgrade to new HTTP Module

## 17.2.11 (2017-07-24)
* Fix: display correct mod key on PC

## 17.2.10 (2017-07-24)
* Bug: Tabs with nested component that have animations don't render correctly

## 17.2.9 (2017-07-20)
* Fix: Ensure form controls scale with font size
* Fix: align placeholders in ngx-input and ngx-select
* Fix: fixed icons that were not displayed correctly in windows
* Fix: removed svg metadata

## 17.2.8 (2017-07-14)
* Fix: Updated ngx-select style, ensured alignment with ngx-inputs
* Fix: Allow multiline hints in ngx-select and ngx-input
* Fix: Make hotkey's help more visible

## 17.2.6 (2017-07-14)
* Bug: AoT Fixes

## 17.2.5 (2017-07-14)
* Bug: AoT Fixes

## 17.2.4 (2017-07-14)
* Bug: AoT Fixes

## 17.2.3 (2017-07-14)
* Bug: AoT Fixes

## 17.2.2 (2017-07-13)
* Bug: Fixed bug in validators that prevented type attribute on ngx-inputs (again)

## 17.2.1 (2017-07-12)
* Bug: Fixed bug in validators that prevented type attribute on ngx-inputs

## 17.2.0 (2017-07-12)
* Feature: add min and max validators for ngx-input[type=number]
* Bug: fix bug where notification container reference would still be present after being removed from the DOM

## 17.1.0 (2017-07-10)
* Feature: add pauseOthers and unpauseOthers to hotkeys service
* Bug: fixed spacing for date and time fields
* Bug: focusedOrDirty getter now valid for numeric inputs to ngx-input

## 17.0.3 (2017-07-06)
* Bug: Fix button not being full width

## 17.0.1, 17.0.2 (2017-07-06)
* Feature: AoT Packaging

## 17.0.0 (2017-07-06)
* Feature: support px basis for ngx-splitter
* Breaking: [minAreaPct] and [maxAreaPct] inputs on ngxSplitArea are now [minBasis] and [maxBasis]

## 16.7.0 (2017-07-05)
* Feature: Add input prefix/suffix

## 16.6.0 (2017-07-03)
* Feature: added toggle event output to ngx-select
* Fix: updated preloader to respond during JS load, #68
* Fix: ensure form elements have correct margin and padding per material design spec

## 16.5.0 (2017-06-28)
* Fix: Consistant alignment, colors, and font sizes for ngx-select and ngx-input
* Feature: added hint input to ngx-select
* Feature: new icons: reference-*, select-user, select-users
* Fix: fixed history icon
* Bug: Fix for toggle button id's colliding with inputs
* Feature: allow disableDropdown in ngx-select
* Feature: new icons: reference-*, select-user, select-users
* Fix: fixed history icon
* Bug: progress icon not aligned in some cases
* Feature: added spreadsheet mode to ngx-codemirror
* Bug: fixed ngx-codemirror elements without children appearing as 'undefined' in code-editor.

## 16.4.1
* Bug: Splitter not working all the time
* Bug: Button position fixes

## 16.4.0
* Feature: Add `autoSelect` on focus to inputs
* Chore: Upgrade webpack and add new optimizations

## 16.3.2
* Feature: Add file upload button error event

## 16.3.0
* Feature: Redesign notifications component
* Feature: Allow notifications to accept custom icons
* Bug: Improve colors and icon sizes in buttons

## 16.2.0
* Bug: run hotkey callbacks in zone
* Icon: html-code icon.
* Bug: Fixed empty strings appearing as 'undefined' in code-editor.
* Icon: Updated and add various icons
* Feature: Implemented progress spinner
* Chore: Bump Angular Version

## 16.1.5, 16.1.4, 16.1.3
* Bug: Hotkeys this is static not instance

## 16.1.2
* Bug: Hotkeys this is static not instance

## 16.1.1
* Bug: Fixed for Hotkey decorator not being exported through the module.
* Bug: Fixed sorting of display label in hotkeys

## 16.1.0
* Feature: Implemented hotkeys service and component
* Enhancement: Replaced user and lock icons
* Enhancement: New icons: star, star-filled, back-arrow, mail
* Bug: Fix for toggle button id's colliding with inputs
* Bug: Fixed unable to clear tags when using identifiers in ngx-select

## 16.0.2
* Icon: Add new builder, workflow, integrations and reports icons
* Fix: Fixed bug where horizontal splitters were using parent width
* Feature: Splitter now respects grow and shrink values in flex-layout
* Feature: Modified the method for distributing size changes

## 16.0.1
* Icon: Add handle icon
* Bug: Fix header buttons having same color as background

## 16.0.0
* Breaking: Update `AlertService` to return type in addition to data
* Feature: Add minAreaPct and maxAreaPct inputs to ngxSplitArea
* Feature: Add double-click event to ngx-split-handle component
* Feature: Add double click split handle to snap to extremes
* Bug: Each ngxSplit now only listens to direct child ngx-split-handles
* Feature: Add dragStart and dragEnd outputs

## 15.0.3
* Enhancement: Add code folding plugins
* Style: Fix various styles to be consistent w/ designs
* Fix: remove resize-handle.svg

## 15.0.2
* Enhancement: Reintroduce text colors.
* Style: Fix various styles to be consistent w/ designs

## 15.0.1
* Enhancement: Improved animations
* Bug: Fix dialog key enter/escape not working at top level
* Bug: Fix everything "scrollbarized"
* Style: Fix various styles to be consistent w/ designs

## 15.0.0
* Breaking: New color weight system and shade definitions
* Enhancement: Added extra icons
* Style: Fix various styles to be consistent w/ designs

## 14.4.0
* Feature: Add next/prev methods on Tabs component.
* Feature: Allow content in Overlay component.
* Style: Fix various styles to be consistent w/ designs

## 14.3.8
* Style: Fix dropdown styles

## 14.3.7
* Bug: Drag handles observing all descendants
* Style: Fix button styles to be consistent w/ designs

## 14.3.6
* Bug: Rework drag handle

## 14.3.5
* Chore: Update flex layout

## 14.3.2, 14.3.3, 14.3.4,
* Bug: Fix split host css class overriding defaults

## 14.3.1
* Bug: Fix input spacing

## 14.3.0
* Feature: Splitter

## 14.2.4
* Bug: Fix drawer animations

## 14.2.3
* Enhancement: Added exit animation to drawers
* Bug: Fixed sizing bug in DrawerService

## 14.2.0
* Enhancement: Added ability to hit enter/escape in prompt dialogs
* Enhancement: Added extra icons
* Chore: Update @angular/flex-layout to 2.0.0.beta-7

## 14.1.0
* Feature: Added ngx-button component

## 14.0.0
* BREAKING: Upgrade to Angular4

## 13.3.1
* Chore: Update ng2-file-upload to 1.2.0

## 13.3.0
* Enhancement: Updated checkbox style
* Enhancement: Added dropzone template to file upload button component
* Enhancement: Added support for min and max length for ngx-input

## 13.2.7
* Chore: Update icon names

## 13.2.6
* Chore: Upgrade @angular/flex-layout to 2.0.0.rc-1

## 13.2.5
* Icon: Add icon-lock-2 and icon-user-2

## 13.2.4
* Bug: Hide overflow text in toolbar title

## 13.2.3
* Enhancement: Change header colors of sections and tables
* Enhancement: Add padding input to sections

## 13.2.2
* Bug: Fixed toggles requiring double click to change state
* Bug: Fix overlay z-index
* Bug: Fix clicking overlay closing multiple components

## 13.2.1
* Enhancement: Export services through main module
* Bug: Do not throw an error when the cancel button is clicked on dialogs

## 13.2.0
* Enhancement: JSON Pipe

## 13.1.0
* Enhancement: Add labels to select

## 13.0.1
* Bug: Fix calendar row alignment
* Icon: Add scatter plot icon

## 13.0.0
* BREAKING: Add `context` object to drawer in place of just manager being passed

## 12.1.1
* Style: Add top bulb to tree
* Bug: Add cursor to selectable tree nodes
* Bug: Disable tree selection when disabled

## 12.1.0
* Feature: Search in code editor
* Feature: Tree Component
* Bug: Fix file upload button having extra padding

## 12.0.0
* Bug: Fix Pipes module import issueså
* Chore: New build system includes TS Types * still no AoT though

## 11.6.1
* Bug: Remove duplicate momentjs
* Bug: Fix spacing on button on date time picker
* Bug: Fix overflow text of select optoins
* Bug: Fix width of select dropdown
* Bug: Fix margin not applied correctly in dialogs

## 11.6.0
* Feature: Add new on single select
* Bug: Fix spacing on single select values

## 11.5.0
* Bug: Remove Textarea resize handle
* Bug: Fix toolbar title overflow issue

## 11.4.0
* Feature: Textarea Input with Autogrow
* Chore: Update Angular to 2.4.5

## 11.3.0
* Feature: Loading Bar Component

## 11.2.0
* Feature: Visibility directive
* Bug: Fix code editor not sizing correct on load if hidden

## 11.1.0
* Feature: Alert/Confirm/Prompt Dialogs

## 10.0.0
* BREAKING: Removing code highlighter
* Feature: Add ability to inline code editor contents

