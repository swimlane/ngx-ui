import { Component, NgModule } from '@angular/core';
import { AppModule } from './module.js';

import './common/index.css';
import './guide/index.css';
import './assets/fonts/icons/icons-font.js';


@NgModule({ imports: [ AppModule ] })
@Component({
  selector: 'app',
  template: `
    <header>
      <img src="assets/logos/logo.svg" width="100" height="100" />
      <h1>Swimlane Style Guide</h1>
    </header>

    <main>

      <section>
        <h2>Buttons</h2>
        <a class="button" href="">Link</a>
        <button class="button">Button</button>
      </section>

    </main>
  `
})
export class App {

}
