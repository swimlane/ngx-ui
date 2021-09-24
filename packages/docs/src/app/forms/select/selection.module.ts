import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DocExampleModule,
  DocMarkdownModule,
  DocPageModule,
  generateRoutes,
} from '@swimlane/ngx-doc';
import { AppearanceModule } from '@swimlane/ngx-ui/appearance';
import { AutofocusModule } from '@swimlane/ngx-ui/autofocus';
import { IconModule } from '@swimlane/ngx-ui/icon';
import { InputAttributeModule } from '@swimlane/ngx-ui/input-attribute';
import { SelectModule } from '@swimlane/ngx-ui/select';
import { AppearancesSelectComponent } from './appearances-select/appearances-select.component';
import { FillAppearancesSelectExampleComponent } from './appearances-select/examples/fill-appearances-select-example/fill-appearances-select-example.component';
import { LegacyAppearancesSelectExampleComponent } from './appearances-select/examples/legacy-appearances-select-example/legacy-appearances-select-example.component';
import { AsyncSelectComponent } from './async-select/async-select.component';
import { AsyncSelectExampleComponent } from './async-select/examples/async-select-example/async-select-example.component';
import { AutoCloseMultiselectExampleComponent } from './multi-select/examples/auto-close-multiselect-example/auto-close-multiselect-example.component';
import { BasicMultiselectExampleComponent } from './multi-select/examples/basic-multiselect-example/basic-multiselect-example.component';
import { MinMaxMultiselectExampleComponent } from './multi-select/examples/min-max-multiselect-example/min-max-multiselect-example.component';
import { MultiDefaultMultiselectExampleComponent } from './multi-select/examples/multi-default-multiselect-example/multi-default-multiselect-example.component';
import { TemplatesMultiselectExampleComponent } from './multi-select/examples/templates-multiselect-example/templates-multiselect-example.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { NativeSelectExampleComponent } from './native-select/examples/native-select-example/native-select-example.component';
import { NativeSelectComponent } from './native-select/native-select.component';
import { SelectPageComponent } from './select-page.component';
import { AddNewSelectExampleComponent } from './single-select/examples/add-new-select-example/add-new-select-example.component';
import { BasicSingleSelectExampleComponent } from './single-select/examples/basic-single-select-example/basic-single-select-example.component';
import { CustomizationSelectExampleComponent } from './single-select/examples/customization-select-example/customization-select-example.component';
import { DisabledPlaceholderSelectExampleComponent } from './single-select/examples/disabled-placeholder-select-example/disabled-placeholder-select-example.component';
import { DisabledPreselectSelectExampleComponent } from './single-select/examples/disabled-preselect-select-example/disabled-preselect-select-example.component';
import { EventsSelectExampleComponent } from './single-select/examples/events-select-example/events-select-example.component';
import { FilterSelectExampleComponent } from './single-select/examples/filter-select-example/filter-select-example.component';
import { GroupingSelectExampleComponent } from './single-select/examples/grouping-select-example/grouping-select-example.component';
import { GroupingTemplateSelectExampleComponent } from './single-select/examples/grouping-template-select-example/grouping-template-select-example.component';
import { HiddenDisabledSelectExampleComponent } from './single-select/examples/hidden-disabled-select-example/hidden-disabled-select-example.component';
import { LongValuesSelectExampleComponent } from './single-select/examples/long-values-select-example/long-values-select-example.component';
import { NoOptionsSelectExampleComponent } from './single-select/examples/no-options-select-example/no-options-select-example.component';
import { PreselectedHiddenSelectExampleComponent } from './single-select/examples/preselected-hidden-select-example/preselected-hidden-select-example.component';
import { RequiredSelectExampleComponent } from './single-select/examples/required-select-example/required-select-example.component';
import { TemplateSelectExampleComponent } from './single-select/examples/template-select-example/template-select-example.component';
import { SingleSelectComponent } from './single-select/single-select.component';
import { BasicTaggingSelectExampleComponent } from './tagging-select/examples/basic-tagging-select-example/basic-tagging-select-example.component';
import { NoOptionsTaggingSelectExampleComponent } from './tagging-select/examples/no-options-tagging-select-example/no-options-tagging-select-example.component';
import { TaggingSelectComponent } from './tagging-select/tagging-select.component';

@NgModule({
  declarations: [
    SelectPageComponent,
    SingleSelectComponent,
    BasicSingleSelectExampleComponent,
    RequiredSelectExampleComponent,
    AddNewSelectExampleComponent,
    FilterSelectExampleComponent,
    LongValuesSelectExampleComponent,
    TemplateSelectExampleComponent,
    GroupingSelectExampleComponent,
    GroupingTemplateSelectExampleComponent,
    DisabledPlaceholderSelectExampleComponent,
    HiddenDisabledSelectExampleComponent,
    DisabledPreselectSelectExampleComponent,
    PreselectedHiddenSelectExampleComponent,
    NoOptionsSelectExampleComponent,
    EventsSelectExampleComponent,
    CustomizationSelectExampleComponent,
    MultiSelectComponent,
    BasicMultiselectExampleComponent,
    MinMaxMultiselectExampleComponent,
    AutoCloseMultiselectExampleComponent,
    MultiDefaultMultiselectExampleComponent,
    TemplatesMultiselectExampleComponent,
    AppearancesSelectComponent,
    AsyncSelectComponent,
    NativeSelectComponent,
    TaggingSelectComponent,
    BasicTaggingSelectExampleComponent,
    NoOptionsTaggingSelectExampleComponent,
    NativeSelectExampleComponent,
    AsyncSelectExampleComponent,
    LegacyAppearancesSelectExampleComponent,
    FillAppearancesSelectExampleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(generateRoutes(SelectPageComponent)),
    DocExampleModule,
    DocPageModule,
    SelectModule,
    FormsModule,
    InputAttributeModule,
    AutofocusModule,
    DocMarkdownModule,
    ReactiveFormsModule,
    IconModule,
    AppearanceModule,
  ],
})
export class SelectionModule {}
