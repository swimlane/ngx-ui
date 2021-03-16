import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'demo-color-block',
  template: `
    <span
      copyToClipboard="clk"
      [copyToClipboardText]="hexSpan.innerText"
      class="inline-block h-12 rounded cursor-pointer"
      [style.backgroundColor]="cssVar ? 'var(' + cssVar + ')' : hex"
    ></span>
    <code *ngIf="weight" class="font-bold text-sm">{{ weight }}</code>
    <span #hexSpan class="font-bold text-sm tracking-wide">
      {{ cssVar ? (cssVar | bgHex) : hex }}
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorBlockComponent {
  @HostBinding('class') hostClass = 'inline-flex flex-col';

  @Input() weight?: string;
  @Input() cssVar?: string;
  @Input() hex?: string;
}
