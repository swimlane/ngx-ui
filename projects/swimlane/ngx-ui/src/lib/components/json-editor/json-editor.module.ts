import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JsonEditorComponent } from './json-editor.component';
import { JsonEditorNodeComponent } from './json-editor-node.component';
import { ObjectNodeComponent } from './node-types/object-node.component';
import { ArrayNodeComponent } from './node-types/array-node.component';
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
export class JsonEditorModule {}
