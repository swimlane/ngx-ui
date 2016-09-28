import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InjectionService, mapModule } from './utils';
import * as componentImports from './components';
import * as directiveImports from './directives';
import './styles/index.scss';

const { declarations, modules, providers } =
  mapModule([componentImports, directiveImports]);

@NgModule({
  declarations,
  providers: [...providers, InjectionService],
  exports: [CommonModule, FormsModule, ...declarations, ...modules],
  imports: [CommonModule, FormsModule, ...modules]
})
export class SWUIModule { }
