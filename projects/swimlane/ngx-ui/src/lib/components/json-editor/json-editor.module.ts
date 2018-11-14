import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JsonEditorComponent } from './json-editor.component';
import { JsonEditorNodeComponent } from './json-editor-node.component';
import { ObjectNodeComponent } from './node-types/object-node.component';
import { ArrayNodeComponent } from './node-types/array-node.component';
import { PipesModule } from '../../pipes';
import { InputModule } from '../input';
import { ButtonModule } from '../button';
import { TooltipModule } from '../tooltip';
import { DropdownModule } from '../dropdown';
import { CodeEditorModule } from '../code-editor';
import { IconModule } from '../icon';
import { ToggleModule } from '../toggle';

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
    ToggleModule
  ]
})
export class JsonEditorModule {}
