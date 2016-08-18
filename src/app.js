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

        <header class="PageHeader pageHeaderGuide u-cf">
          <h2 class="u-floatLeft">
            Style Guide
            <small>v{{version}}</small>
          </h2>

          <div class="u-floatRight">
            <a href="#">Light</a> | <a href="#">Dark</a>
          </div>
        </header>

        <section>
          <h3 class="styleHeader">Colors</h3>

          <div class="Grid Grid--withGutter Grid--fit">

            <div class="Grid-cell">
              <ul class="color-group">
                <li class="color main-color u-cf color-blue">
                  <span class="name u-floatLeft">Blues</span>
                  <span class="hex tag tag-small u-floatRight">--color-blue</span>
                </li>
                <li class="color color-blue-med u-cf">
                  <span class="hex tag tag-small u-floatRight">--color-blue-med</span>
                </li>
                <li class="color color-blue-light u-cf">
                  <span class="hex tag tag-small u-floatRight">--color-blue-light</span>
                </li>
              </ul>
            </div>

            <div class="Grid-cell">
              <ul class="color-group">
                <li class="color main-color u-cf color-green">
                  <span class="name u-floatLeft">Greens</span>
                  <span class="hex tag tag-small u-floatRight">--color-green</span>
                </li>
                <li class="color color-green-med u-cf">
                  <span class="hex tag tag-small u-floatRight">--color-green-med</span>
                </li>
                <li class="color color-green-light u-cf">
                  <span class="hex tag tag-small u-floatRight">--color-green-light</span>
                </li>
              </ul>
            </div>

          </div>

        </section>

        <section>
          <h3 class="styleHeader">Buttons</h3>
          <a class="button" href="">Link</a>
          <button class="button">Button</button>
        </section>

      </div>
    </main>
  `
})
export class App {

  version = APP_VERSION;

  colors = [

    [ '' ]

  ]

}
