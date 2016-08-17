import { Component, NgModule } from '@angular/core';
import { AppModule } from './module.js';

import './app.css';
import './assets/fonts/icons/icons-font.js';


@NgModule({ imports: [ AppModule ] })
@Component({
  selector: 'app',
  template: `
    <main class="Grid u-flex u-flexAlignItemsStretch">
      <div class="Grid-cell u-size1of4 FlexItem NavCol">

        <h1 class="Branding">
          <span class="icon-logo"></span>
          Swim<span class="color-blue">lane</span>
        </h1>

        <nav>
          <ul>
            <li><a href="#">Colors</a></li>
            <li><a href="#">Text</a></li>
            <li><a href="#">Buttons</a></li>
          </ul>
        </nav>

      </div>
      <div class="Grid-cell u-sizeFill FlexItem">

        <header class="PageHeader styleHeader">
          <h2>Style Guide</h2>
        </header>

        <section>
          <h3>Colors</h3>



        </section>

        <section>
          <h3>Buttons</h3>
          <a class="button" href="">Link</a>
          <button class="button">Button</button>
        </section>

      </div>
    </main>
  `
})
export class App {

}
