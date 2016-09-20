import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { mapModule } from './utils/module-mapper';
import * as componentImports from './components/index';
import * as directiveImports from './directives/index';
import './styles/index.scss';

const { declarations, modules, providers } =
  mapModule([componentImports, directiveImports]);

@NgModule({
  declarations,
  providers,
  exports: [...declarations, ...modules],
  imports: [BrowserModule, FormsModule, ...modules]
})
export class CommonModule { }
