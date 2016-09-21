import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
  exports: [...declarations, ...modules],
  imports: [BrowserModule, FormsModule, ...modules]
})
export class CommonModule { }
