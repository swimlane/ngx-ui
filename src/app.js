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
            <li><a href="#">Typography</a></li>
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

          <div class="u-flex u-flexWrap">
            <div class="FlexItem" *ngFor="let color of colors">
              <ul class="color-group shadow-2 shadow-fx">
                <li class="color main-color u-cf color-{{color}}">
                  <span class="name u-floatLeft">{{color}}</span>
                  <span class="hex tag tag-small u-floatRight">--color-{{color}}</span>
                </li>
                <li class="color color-{{color}}-med u-cf">
                  <span class="hex tag tag-small u-floatRight">--color-{{color}}-med</span>
                </li>
                <li class="color color-{{color}}-light u-cf">
                  <span class="hex tag tag-small u-floatRight">--color-{{color}}-light</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h3 class="styleHeader">Typography: Headings</h3>
          <h1>h1. Improve your Security Operations</h1>
          <h2>h2. Improve your Security Operations</h2>
          <h3>h3. Improve your Security Operations</h3>
          <h4>h4. Improve your Security Operations</h4>
          <h5>h5. Improve your Security Operations</h5>
        </section>

        <section>
          <h3 class="styleHeader">Typography: Paragraph</h3>
          <p>As cyber attacks continue to rise, organizations are investing heavily in attack identification, threat intelligence and the staff required to protect the enterprise. However, alerts are still going unresolved, and often unseen. Realizing that simply adding people does not solve the problem, organizations are choosing Swimlane for security automation and orchestration</p>
          <p>Swimlane consolidates security alerts from multiple sources and automatically assists organizations with the activities required to resolve alerts and stop attacks. The resolution of the alert can occur either automatically or manually by analyst intervention. Either way, the alert is resolved utilizing expert-defined processes, enabling the organization to cost-effectively close alerts.</p>
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
    'blue',
    'light-blue',
    'green',
    'red',
    'orange'
  ];

}
