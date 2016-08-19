import { Component } from '@angular/core';

import './app.css';
import './assets/fonts/icons/icons-font.js';

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
          <h3 class="styleHeader">Colors: Palettes</h3>

          <div class="u-flex u-flexWrap">
            <div class="FlexItem" *ngFor="let color of colors">
              <ul class="color-group shadow-2 shadow-fx">
                <li class="color main-color u-cf color-{{color}}">
                  <span class="name u-floatLeft">{{color}}</span>
                  <span class="hex tag tag-small u-floatRight" dbl-click-copy>--color-{{color}}</span>
                </li>
                <li class="color color-{{color}}-med u-cf">
                  <span class="hex tag tag-small u-floatRight" dbl-click-copy>--color-{{color}}-med</span>
                </li>
                <li class="color color-{{color}}-light u-cf">
                  <span class="hex tag tag-small u-floatRight" dbl-click-copy>--color-{{color}}-light</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section>
          <h3 class="styleHeader">Colors: Formatting</h3>

          <div class="u-flex u-flexWrap">
            <div class="FlexItem">
              <ul class="color-group shadow-2 shadow-fx">
                <li class="color main-color u-cf color-bg-darkest">
                  <span class="name u-floatLeft" style="color:white">Backgrounds</span>
                  <span class="hex tag tag-small u-floatRight" dbl-click-copy>--color-bg-darkest</span>
                </li>
                <li class="color color-bg-darker u-cf">
                  <span class="hex tag tag-small u-floatRight" dbl-click-copy>--color-bg-darker</span>
                </li>
                <li class="color color-bg-dark u-cf">
                  <span class="hex tag tag-small u-floatRight" dbl-click-copy>--color-bg-dark</span>
                </li>
                <li class="color color-bg-light u-cf">
                  <span class="hex tag tag-small u-floatRight" dbl-click-copy>--color-bg-light</span>
                </li>
                <li class="color color-bg-lighter u-cf">
                  <span class="hex tag tag-small u-floatRight" dbl-click-copy>--color-bg-lighter</span>
                </li>
              </ul>
            </div>

            <div class="FlexItem">
              <ul class="color-group shadow-2 shadow-fx">
                <li class="color main-color u-cf color-text-dark">
                  <span class="name u-floatLeft">Texts</span>
                  <span class="hex tag tag-small u-floatRight" dbl-click-copy>--color-text-dark</span>
                </li>
                <li class="color color-text-med-dark u-cf">
                  <span class="hex tag tag-small u-floatRight" dbl-click-copy>--color-text-med-dark</span>
                </li>
                <li class="color color-text-med u-cf">
                  <span class="hex tag tag-small u-floatRight" dbl-click-copy>--color-text-med</span>
                </li>
                <li class="color color-text-light u-cf">
                  <span class="hex tag tag-small u-floatRight" dbl-click-copy>--color-text-light</span>
                </li>
                <li class="color color-text-lighter u-cf">
                  <span class="hex tag tag-small u-floatRight" dbl-click-copy>--color-text-lighter</span>
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
          <h3 class="styleHeader">Typography: Lists</h3>
          <ol>
            <li>John</li>
            <li>Paul</li>
            <li>George</li>
            <li>Ringo</li>
          </ol>

          <ul>
            <li>John</li>
            <li>Paul</li>
            <li>George</li>
            <li>Ringo</li>
          </ul>
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
