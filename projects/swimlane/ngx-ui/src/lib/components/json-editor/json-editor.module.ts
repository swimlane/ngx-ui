import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PipesModule } from '../../pipes/pipes.module';
import { InputModule } from '../input/input.module';
import { ButtonModule } from '../button/button.module';
import { TooltipModule } from '../tooltip/tooltip.module';
import { DropdownModule } from '../dropdown/dropdown.module';
import { CodeEditorModule } from '../code-editor/code-editor.module';
import { IconModule } from '../icon/icon.module';
import { ToggleModule } from '../toggle/toggle.module';
import { SelectModule } from '../select/select.module';
import { SchemaValidatorService } from './schema-validator.service';

import { JsonEditorComponent } from './json-editor/json-editor.component';
import { JsonEditorNodeComponent } from './json-editor/json-editor-node/json-editor-node.component';
import { ObjectNodeComponent } from './json-editor/json-editor-node/node-types/object-node/object-node.component';
import { ArrayNodeComponent } from './json-editor/json-editor-node/node-types/array-node/array-node.component';

import { JsonEditorFlatComponent } from './json-editor-flat/json-editor-flat.component';
import { JsonEditorNodeFlatComponent } from './json-editor-flat/json-editor-node-flat/json-editor-node-flat.component';
import { ArrayNodeFlatComponent } from './json-editor-flat/json-editor-node-flat/node-types/array-node-flat/array-node-flat.component';
import { ObjectNodeFlatComponent } from './json-editor-flat/json-editor-node-flat/node-types/object-node-flat/object-node-flat.component';

@NgModule({
  declarations: [
    JsonEditorComponent,
    JsonEditorNodeComponent,
    ObjectNodeComponent,
    ArrayNodeComponent,
    JsonEditorFlatComponent,
    JsonEditorNodeFlatComponent,
    ArrayNodeFlatComponent,
    ObjectNodeFlatComponent
  ],
  exports: [
    JsonEditorComponent,
    JsonEditorNodeComponent,
    ObjectNodeComponent,
    ArrayNodeComponent,
    JsonEditorFlatComponent,
    JsonEditorNodeFlatComponent,
    ArrayNodeFlatComponent,
    ObjectNodeFlatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    InputModule,
    ButtonModule,
    CodeEditorModule,
    TooltipModule,
    DropdownModule,
    IconModule,
    ToggleModule,
    SelectModule
  ],
  providers: [SchemaValidatorService]
})
export class JsonEditorModule { }
