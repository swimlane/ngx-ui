import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppearanceModule } from '@swimlane/ngx-ui/appearance';
import { AutofocusModule } from '@swimlane/ngx-ui/autofocus';
import { AutosizeModule } from '@swimlane/ngx-ui/autosize';
import { ButtonModule } from '@swimlane/ngx-ui/button';
import { CheckboxModule } from '@swimlane/ngx-ui/checkbox';
import { CodeEditorModule } from '@swimlane/ngx-ui/code-editor';
import { DropdownModule } from '@swimlane/ngx-ui/dropdown';
import { IconModule } from '@swimlane/ngx-ui/icon';
import { InputModule } from '@swimlane/ngx-ui/input';
import { InputAttributeModule } from '@swimlane/ngx-ui/input-attribute';
import { SelectModule } from '@swimlane/ngx-ui/select';
import { SizeModule } from '@swimlane/ngx-ui/size';
import { TabsModule } from '@swimlane/ngx-ui/tabs';
import { ToggleModule } from '@swimlane/ngx-ui/toggle';
import { TooltipModule } from '@swimlane/ngx-ui/tooltip';
import { JsonEditorFlatComponent } from './json-editor-flat/json-editor-flat.component';
import { ArrayNodeFlatComponent } from './json-editor-flat/json-editor-node-flat/array-node-flat/array-node-flat.component';
import { JsonEditorNodeFlatComponent } from './json-editor-flat/json-editor-node-flat/json-editor-node-flat.component';
import { NodeInfoComponent } from './json-editor-flat/json-editor-node-flat/node-info/node-info.component';
import { ObjectNodeFlatComponent } from './json-editor-flat/json-editor-node-flat/object-node-flat/object-node-flat.component';
import { PropertyConfigComponent } from './json-editor-flat/json-editor-node-flat/property-config/property-config.component';
import { OrderableInputsListComponent } from './json-editor-flat/orderable-inputs-list/orderable-inputs-list.component';
import { ArrayNodeComponent } from './json-editor/json-editor-node/array-node/array-node.component';
import { JsonEditorNodeComponent } from './json-editor/json-editor-node/json-editor-node.component';
import { ObjectNodeComponent } from './json-editor/json-editor-node/object-node/object-node.component';
import { JsonEditorComponent } from './json-editor/json-editor.component';
import { ObjectNotEmptyPipe, ObjectValuesPipe } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    DropdownModule,
    IconModule,
    FormsModule,
    TooltipModule,
    ButtonModule,
    CodeEditorModule,
    InputModule,
    InputAttributeModule,
    SizeModule,
    AppearanceModule,
    DragDropModule,
    CheckboxModule,
    ToggleModule,
    SelectModule,
    TabsModule,
    AutofocusModule,
    AutosizeModule,
  ],
  declarations: [
    ObjectValuesPipe,
    JsonEditorComponent,
    JsonEditorFlatComponent,
    ArrayNodeComponent,
    ObjectNodeComponent,
    JsonEditorNodeComponent,
    OrderableInputsListComponent,
    JsonEditorNodeFlatComponent,
    ArrayNodeFlatComponent,
    ObjectNodeFlatComponent,
    NodeInfoComponent,
    PropertyConfigComponent,
    ObjectNotEmptyPipe,
  ],
  exports: [
    ObjectValuesPipe,
    JsonEditorComponent,
    JsonEditorFlatComponent,
    ArrayNodeComponent,
    ObjectNodeComponent,
    JsonEditorNodeComponent,
    OrderableInputsListComponent,
    JsonEditorNodeFlatComponent,
    ArrayNodeFlatComponent,
    ObjectNodeFlatComponent,
    NodeInfoComponent,
    PropertyConfigComponent,
    ObjectNotEmptyPipe,
  ],
})
export class JsonEditorModule {}
