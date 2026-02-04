---
name: ngx-ui to lit-ui gap
overview: All ngx-ui components needed for lit-ui, with implementation status. Directives, services, pipes, animations, decorators, and utils are out of scope.
todos: []
isProject: false
---

# lit-ui Component Checklist

All **necessary components** from ngx-ui for lit-ui. Use the **Implemented** column to track what is done. Only components are in scope (no directives, services, pipes, animations, decorators, utils).

**Reference:** ngx-ui [public_api.ts](projects/swimlane/ngx-ui/src/public_api.ts), lit-ui [index.ts](projects/swimlane/lit-ui/src/index.ts).

---

## 1. Components – implementation status

| Component              | Implemented | Notes                                                                                        |
| ---------------------- | ----------- | -------------------------------------------------------------------------------------------- |
| **Button**             | Yes         | Base implemented; FileButton, FileButtonStyle not in lit                                      |
| **Button group**       | No          | ButtonGroupComponent                                                                         |
| **Button toggle**      | No          | ButtonToggleComponent, ButtonToggleGroupComponent                                            |
| **Calendar**           | No          | CalendarComponent, day/month/view types and interfaces                                      |
| **Card**               | No          | Card, CardHeader, CardFooter, CardPlaceholder, CardAvatar                                    |
| **Checkbox**           | No          | CheckboxComponent                                                                            |
| **Code editor**        | No          | CodeEditorComponent, HintCompletion interface                                               |
| **Date-time**          | No          | DateTimeComponent, type/enum exports                                                         |
| **Time display**       | No          | TimeDisplayComponent                                                                         |
| **Dialog**             | No          | Dialog, large-format, stepper/tabs, Alert, drawer content, footer                            |
| **Drawer**             | No          | Drawer, position/direction/options, container                                                |
| **Dropdown**           | No          | Dropdown, toggle/menu directives, show-types enum                                            |
| **Dropzone**           | No          | DropzoneComponent                                                                            |
| **Filter**             | No          | FilterComponent (component, not pipe)                                                       |
| **Date range calendar**| No          | DateRangePickerComponent                                                                     |
| **Hotkeys**            | No          | Hotkeys component, status enum — *Not prioritized in lit*                                     |
| **Icon**               | No          | IconComponent                                                                                |
| **Input**              | Yes         | Base implemented; InputSuffix, InputPrefix, InputHint, InputAutosize not in lit               |
| **JSON editor**        | No          | Tree + flat editor, schema validator, node types — *Not prioritized in lit*                  |
| **List**               | No          | List, list header/row/column, templates, pagination, row status                              |
| **Loading**            | No          | Loading component                                                                            |
| **Long-press button**  | No          | Long-press button component and state enum                                                   |
| **Multi-dimension selection** | No   | Component, selection-list, selection types                                                   |
| **Nag**                | No          | NagComponent                                                                                 |
| **Nav menu**           | No          | NavMenuComponent                                                                             |
| **Navbar**             | No          | Navbar, NavbarItem, animation                                                                |
| **Notification**       | No          | Notification component, container, types/styles/options enums                                 |
| **Overlay**            | No          | Overlay, ResizeOverlay                                                                       |
| **Progress spinner**   | No          | ProgressSpinner, mode enum                                                                   |
| **Radiobutton**        | No          | Radiobutton, RadiobuttonGroup                                                                |
| **Section**            | No          | Section, SectionHeader                                                                      |
| **Select**             | Yes         | Base implemented; option/input templates, SelectInput, SelectDropdown details not in lit     |
| **Slider**             | No          | SliderComponent                                                                              |
| **Split**              | No          | Split, SplitHandle, SplitArea, direction enum                                                |
| **Stepper**            | No          | Stepper, Step, StepContent, position enum                                                   |
| **Tabs**               | Yes         | Base implemented; IfTabActive-style behavior not in lit                                      |
| **Column / Columns**   | No          | Columns, Column, column types                                                               |
| **Toggle**             | No          | ToggleComponent                                                                             |
| **Toolbar**            | No          | Toolbar, ToolbarTitle, ToolbarContent, ToolbarMenuItem interface                            |
| **Tooltip**            | No          | Tooltip component, config, style/show enums                                                  |
| **Tree**               | No          | Tree, TreeNode, tree node model                                                              |
| **Tip**                | No          | Tip component, tip status enum                                                               |
| **Plus menu**          | No          | PlusMenu component, position enum — *Not prioritized in lit*                                |

---

## 2. Suggested order for implementation

Prioritized by usage and dependency:

1. **Foundation:** Icon, Tooltip, Loading, Progress spinner — used across many components.
2. **Overlay stack:** Overlay, Dialog, Drawer, Notification — shared overlay/positioning.
3. **Forms:** Checkbox, Toggle, Radiobutton, Slider, DateTime, DateRange, Dropdown.
4. **Layout/navigation:** Card, Section, Columns, Navbar, Nav menu, Stepper, Tabs (extras), Toolbar.
5. **Data display:** List, Tree, Filter component.
6. **Specialized:** Code editor, Nag, Tip, Dropzone, Split, etc. *(Plus menu, JSON editor, Hotkeys are not prioritized in lit.)*

Update the **Implemented** column to **Yes** as each component is completed in lit-ui.
