import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'demo-typography',
  templateUrl: './typography.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyComponent {
  fontStyles = {
    Light: 'font-weight: 300; font-style: normal',
    'Light Italic': 'font-weight: 300; font-style: italic',
    Regular: 'font-weight: 400; font-style: normal',
    'Regular Italic': 'font-weight: 400; font-style: italic',
    'Semi-Bold': 'font-weight: 600; font-style: normal',
    'Semi-Bold Italic': 'font-weight: 600; font-style: italic',
    Bold: 'font-weight: bold; font-style: normal',
    'Bold Italic': 'font-weight: bold; font-style: italic',
  };

  chars = `
    ​‌‘ ​‌? ​‌’ ​‌“ ​‌! ​‌” ​‌( ​‌%​‌ )​‌ [ ​‌# ​‌]​‌ { ​‌@ ​‌}​‌ /​‌& ​‌<​‌
    - ​‌+​ ‌÷​ ‌×​ ‌= ​‌> ​‌® ​‌© ​‌$ ​‌€ ​‌£ ​‌¥ ​‌¢ ​‌: ​‌; ​‌, ​‌. ​‌*
  `;

  nums = `
    1​‌ 2 ​‌3 ​‌4 ​‌5 ​‌6 ​‌7 ​‌8 ​‌9 ​‌0
  `;

  letters = `
    ​‌A​‌ B ​‌C ​‌Ć ​‌D ​‌E ​‌F ​‌G ​‌H ​‌I ​‌J ​‌K ​‌L ​‌M ​‌
    N​‌ O​‌ P​‌ Q ​‌R ​‌S​‌ Š​‌ T ​‌U​‌ V ​‌W​‌ X ​‌Y ​‌Z ​‌Ž​‌
  `;

  lettersLower = `
    a b​‌ c ​‌ć​‌ d​‌ e​‌ f​‌ g​‌ h​‌ i ​‌j ​‌k​‌ l ​‌m​‌
    n​‌ o ​‌p​‌ q​‌ r ​‌s ​‌š​‌ t​‌ u​‌ v​‌ w​‌ x​‌ y​‌ z​‌ ž​‌
  `;

  headingsMd = `
  \`\`\`html
    <h1>
      h1. Improve your Security Operations
      <small>Insight and Automation</small>
    </h1>
    <h2>
      h2. Improve your Security Operations
      <small>Insight and Automation</small>
    </h2>
    <h3>
      h3. Improve your Security Operations
      <small>Insight and Automation</small>
    </h3>
    <h4>
      h4. Improve your Security Operations
      <small>Insight and Automation</small>
    </h4>
    <h5>
      h5. Improve your Security Operations
      <small>Insight and Automation</small>
    </h5>
    \`\`\`
  `;

  anchorsMd = `
    \`\`\`html
    <a href="/">Default</a>
    <a href="/" class="disabled">Disabled</a>
    \`\`\`
  `;

  paragraphsMd = `
    \`\`\`html
    <p>
      As cyber attacks continue to rise, organizations are investing heavily in
      attack identification, threat intelligence and the staff required to protect
      the enterprise. However, alerts are still going unresolved, and often
      unseen. Realizing that simply adding people does not solve the problem,
      organizations are choosing Swimlane for security automation and
      orchestration
    </p>
    <p>
      Swimlane consolidates security alerts from multiple sources and
      automatically assists organizations with the activities required to resolve
      alerts and stop attacks. The resolution of the alert can occur either
      automatically or manually by analyst intervention. Either way, the alert is
      resolved utilizing expert-defined processes, enabling the organization to
      cost-effectively close alerts.
    </p>
    <p class="hint">
      Paragraphs with the 'hint' class are styled smaller with italics.
    </p>
    <p class="thin">Paragraphs with the 'thin' class are light font weight.</p>
    <p class="ultra-thin">
      Paragraphs with the 'ultra-thin' class are extra light font weight.
    </p>
    \`\`\`
  `;

  codeMd = `
    \`\`\`html
    <pre>var foo</pre>
    \`\`\`
  `;

  constructor(readonly sanitizer: DomSanitizer) {
    for (let style of Object.values(this.fontStyles)) {
      style = sanitizer.bypassSecurityTrustStyle(style) as string;
    }
  }
}
