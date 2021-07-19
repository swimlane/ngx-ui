import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  NotificationService,
  NotificationStyleType,
} from '@swimlane/ngx-ui/notification';

@Component({
  selector: 'docs-color-block',
  template: `
    <span
      class="color-block"
      ngxCopyToClipboard="dblclk"
      [ngxCopyToClipboardText]="cssVar"
      (copied)="onColorCopy($event)"
      [style.backgroundColor]="cssVar ? 'var(' + cssVar + ')' : hex"
    ></span>
    <code *ngIf="weight">{{ weight }}</code>
    <span #hexSpan class="color-text">
      {{ cssVar ? (cssVar | bgHex) : hex }}
    </span>
  `,
  styles: [
    // language=scss
    `
      :host {
        display: inline-flex;
        flex-direction: column;

        & span.color-block {
          display: inline-block;
          height: 3rem;
          border-radius: 0.25rem;
          cursor: pointer;
        }

        & code {
          font-weight: bold;
          font-size: small;
        }

        & span.color-text {
          font-weight: bold;
          font-size: small;
          letter-spacing: 0.025rem;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorBlockComponent {
  @Input() weight?: string;
  @Input() cssVar?: string;
  @Input() hex?: string;

  constructor(private readonly notificationService: NotificationService) {}

  onColorCopy(color: string) {
    this.notificationService.create({
      title: 'Copied to clipboard',
      body: color,
      styleType: NotificationStyleType.info,
    });
  }
}
