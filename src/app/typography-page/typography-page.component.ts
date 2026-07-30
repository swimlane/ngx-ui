/* eslint-disable no-irregular-whitespace */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-typography-page',
  templateUrl: './typography-page.component.html',
  styleUrls: ['./typography-page.component.scss'],
  standalone: false
})
export class TypographyPageComponent {
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

  fontKeys = Object.keys(this.fontStyles);

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

  constructor(private sanitizer: DomSanitizer) {
    this.fontKeys.forEach(key => {
      this.fontStyles[key] = this.sanitizer.bypassSecurityTrustStyle(this.fontStyles[key]);
    });
  }
}
