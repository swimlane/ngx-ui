import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'docs-typography-fonts',
  template: `
    <ngx-doc-example heading="Fonts" id="fonts">
      <h3>
        Source Sans Pro
        <small style="float: right">
          <a
            href="https://fonts.google.com/specimen/Source+Sans+Pro"
            target="_blank"
          >
            Download on Google Fonts
          </a>
        </small>
      </h3>
      <div>
        <div>
          <h1>{{ letters }}</h1>
          <h1>{{ lettersLower }}</h1>
        </div>
        <div>
          <h1>{{ chars }}</h1>
          <h1>{{ nums }}</h1>
        </div>
      </div>

      <ul class="list-unstyled" style="font-size: 2em">
        <li *ngFor="let style of fontStyles | keyvalue" [style]="style.value">
          {{ style.key }}
        </li>
      </ul>
    </ngx-doc-example>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TypographyFontsComponent {
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

  constructor(readonly sanitizer: DomSanitizer) {
    for (let style of Object.values(this.fontStyles)) {
      style = sanitizer.bypassSecurityTrustStyle(style) as string;
    }
  }
}
