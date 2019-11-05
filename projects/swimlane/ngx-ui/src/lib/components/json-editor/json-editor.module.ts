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

import { JsonEditorComponent } from './v1/json-editor/json-editor.component';
import { JsonEditorNodeComponent } from './v1/json-editor-node/json-editor-node.component';
import { ObjectNodeComponent } from './v1/node-types/object-node/object-node.component';
import { ArrayNodeComponent } from './v1/node-types/array-node/array-node.component';

import { JsonEditorV2Component } from './v2/json-editor-v2/json-editor-v2.component';
import { JsonEditorNodeV2Component } from './v2/json-editor-node-v2/json-editor-node-v2.component';
import { ArrayNodeV2Component } from './v2/node-types/array-node-v2/array-node-v2.component';
import { ObjectNodeV2Component } from './v2/node-types/object-node-v2/object-node-v2.component';

@NgModule({
  declarations: [
    JsonEditorComponent,
    JsonEditorNodeComponent,
    ObjectNodeComponent,
    ArrayNodeComponent,
    JsonEditorV2Component,
    JsonEditorNodeV2Component,
    ArrayNodeV2Component,
    ObjectNodeV2Component
  ],
  exports: [
    JsonEditorComponent,
    JsonEditorNodeComponent,
    ObjectNodeComponent,
    ArrayNodeComponent,
    JsonEditorV2Component,
    JsonEditorNodeV2Component,
    ArrayNodeV2Component,
    ObjectNodeV2Component
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
