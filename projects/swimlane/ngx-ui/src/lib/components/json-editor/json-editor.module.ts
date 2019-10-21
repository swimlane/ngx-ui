import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JsonEditorNodeComponent } from './v1/json-editor-node/json-editor-node.component';
import { ObjectNodeComponent } from './v1/node-types/object-node/object-node.component';
import { ArrayNodeComponent } from './v1/node-types/array-node/array-node.component';
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

@NgModule({
  declarations: [JsonEditorComponent, JsonEditorNodeComponent, ObjectNodeComponent, ArrayNodeComponent],
  exports: [JsonEditorComponent, JsonEditorNodeComponent, ObjectNodeComponent, ArrayNodeComponent],
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
