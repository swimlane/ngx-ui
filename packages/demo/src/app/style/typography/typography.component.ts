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
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true
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
    'Bold Italic': 'font-weight: bold; font-style: italic'
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
