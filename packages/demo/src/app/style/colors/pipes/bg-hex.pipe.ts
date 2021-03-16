import { DOCUMENT } from '@angular/common';
import { Inject, Pipe, PipeTransform } from '@angular/core';
import * as tinycolor from 'tinycolor2';

@Pipe({
  name: 'bgHex'
})
export class BgHexPipe implements PipeTransform {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  transform(cssVar: string): unknown {
    const cssVarValue = this.document.defaultView
      ?.getComputedStyle(this.document.documentElement)
      .getPropertyValue(cssVar);
    return cssVarValue ? `#${tinycolor(cssVarValue).toHex()}` : 'N/A';
  }
}
