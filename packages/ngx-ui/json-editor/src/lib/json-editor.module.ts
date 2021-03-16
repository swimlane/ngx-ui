import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from '@swimlane/ngx-ui/button';
import { CheckboxModule } from '@swimlane/ngx-ui/checkbox';
import { CodeEditorModule } from '@swimlane/ngx-ui/code-editor';
import { DialogModule } from '@swimlane/ngx-ui/dialog';
import { DropdownModule } from '@swimlane/ngx-ui/dropdown';
import { IconModule } from '@swimlane/ngx-ui/icon';
import { InputModule } from '@swimlane/ngx-ui/input';
import { SelectModule } from '@swimlane/ngx-ui/select';
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
import { SchemaValidatorService } from './services';

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    IconModule,
    TooltipModule,
    SelectModule,
    ButtonModule,
    CodeEditorModule,
    FormsModule,
    DragDropModule,
    InputModule,
    CheckboxModule,
    TabsModule,
    DropdownModule,
    ToggleModule
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
    ObjectNotEmptyPipe
  ],
  providers: [SchemaValidatorService],
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
    ObjectNotEmptyPipe
  ]
})
export class JsonEditorModule {}
