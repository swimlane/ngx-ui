import type { TemplateRef } from '@angular/core';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Throttleable } from '@swimlane/ngx-ui/common';
import {
  AlignmentType,
  Dimension,
  PlacementType,
} from '@swimlane/ngx-ui/typings';
import {
  determinePlacement,
  positionCaret,
  positionContent,
} from '@swimlane/ngx-ui/utils';
import { TooltipStyleTypes } from './enums';

@Component({
  selector: 'ngx-tooltip-content',
  exportAs: 'ngxTooltipContent',
  // templateUrl: './tooltip-content.component.html',
  template: `
    <div>
      <span
        #caretElm
        class="tooltip-caret"
        [ngClass]="'position-' + placement"
        [hidden]="!showCaret"
      ></span>
      <div class="tooltip-content">
        <span *ngIf="!title && template">
          <ng-template
            [ngTemplateOutlet]="template"
            [ngTemplateOutletContext]="{ model: context }"
          >
          </ng-template>
        </span>
        <span *ngIf="title" [innerHTML]="title"> </span>
      </div>
    </div>
  `,
  // styleUrls: ['./tooltip-content.component.scss'],
  styles: [
    // language=scss
    `
      .ngx-tooltip-content {
        --ngx-ui-tooltip-bg: var(--ngx-ui-color-blue-grey-200);
        --ngx-ui-tooltip-color: var(--ngx-ui-color-blue-grey-700);
        --ngx-ui-tooltip-caret-bg: var(--ngx-ui-tooltip-bg);
        --ngx-ui-tooltip-border: transparent;
        --ngx-ui-tooltip-spacing: 0.625rem;

        --ngx-ui-popover-bg: var(--ngx-ui-color-blue-grey-200);
        --ngx-ui-popover-color: var(--ngx-ui-color-blue-grey-700);
        --ngx-ui-popover-caret-bg: var(--ngx-ui-popover-bg);
        --ngx-ui-popover-border: transparent;
        --ngx-ui-popover-spacing: 0.625rem;

        position: fixed;
        z-index: 5000;
        display: block;
        font-weight: normal;
        opacity: 0;

        &.type-popover {
          background: var(--ngx-ui-popover-bg);
          color: var(--ngx-ui-popover-color);
          border: 1px solid var(--ngx-ui-popover-border);
          box-shadow: var(--ngx-ui-shadow-3);
          font-size: 0.75rem;
          padding: 0.625rem;

          .tooltip-caret {
            position: absolute;
            z-index: 5001;
            width: 0;
            height: 0;

            &.position-left {
              border-top: 0.5rem solid transparent;
              border-bottom: 0.5rem solid transparent;
              border-left: 0.5rem solid var(--ngx-ui-popover-caret-bg);
            }

            &.position-top {
              border-left: 0.5rem solid transparent;
              border-right: 0.5rem solid transparent;
              border-top: 0.5rem solid var(--ngx-ui-popover-caret-bg);
            }

            &.position-right {
              border-top: 0.5rem solid transparent;
              border-bottom: 0.5rem solid transparent;
              border-right: 0.5rem solid var(--ngx-ui-popover-caret-bg);
            }

            &.position-bottom {
              border-left: 0.5rem solid transparent;
              border-right: 0.5rem solid transparent;
              border-bottom: 0.5rem solid var(--ngx-ui-popover-caret-bg);
            }
          }
        }

        &.type-tooltip {
          color: var(--ngx-ui-tooltip-color);
          background: var(--ngx-ui-tooltip-bg);
          font-size: 0.75rem;
          padding: 0.25rem;
          text-align: center;

          .tooltip-caret {
            &.position-left {
              border-top: 0.5rem solid transparent;
              border-bottom: 0.5rem solid transparent;
              border-left: 0.5rem solid var(--ngx-ui-tooltip-caret-bg);
            }

            &.position-top {
              border-left: 0.5rem solid transparent;
              border-right: 0.5rem solid transparent;
              border-top: 0.5rem solid var(--ngx-ui-tooltip-caret-bg);
            }

            &.position-right {
              border-top: 0.5rem solid transparent;
              border-bottom: 0.5rem solid transparent;
              border-right: 0.5rem solid var(--ngx-ui-tooltip-caret-bg);
            }

            &.position-bottom {
              border-left: 0.5rem solid transparent;
              border-right: 0.5rem solid transparent;
              border-bottom: 0.5rem solid var(--ngx-ui-tooltip-caret-bg);
            }
          }
        }

        .tooltip-caret {
          position: absolute;
          z-index: 5001;
          width: 0;
          height: 0;
        }

        &.position-right {
          transform: translate3d(0.625rem, 0, 0);
        }

        &.position-left {
          transform: translate3d(-0.625rem, 0, 0);
        }

        &.position-top {
          transform: translate3d(0, -0.625rem, 0);
        }

        &.position-bottom {
          transform: translate3d(0, 0.625rem, 0);
        }

        &.animate {
          opacity: 1;
          transition: opacity 0.3s, transform 0.3s;
          transform: translate3d(0, 0, 0);
        }

        &.narrow {
          max-width: 300px;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipContentComponent implements AfterViewInit {
  @HostBinding('class.ngx-tooltip-content') hostClass = true;

  @ViewChild('caretElm', { static: true })
  readonly caretElm!: ElementRef<HTMLSpanElement>;

  @Input() host?: ElementRef<HTMLElement>;
  @Input() type?: TooltipStyleTypes;
  @Input() placement?: PlacementType;
  @Input() alignment?: AlignmentType;
  @Input() cssClass?: string;
  @Input() title?: string;
  @Input() template?: TemplateRef<unknown>;
  @Input() context?: unknown;

  @Input() showCaret?: boolean;
  @Input() spacing?: number;

  @HostBinding('class')
  get cssClasses(): string {
    let clz = 'ngx-tooltip-content';
    clz += ` position-${this.placement}`;
    clz += ` type-${this.type}`;
    clz += ` ${this.cssClass}`;
    return clz;
  }

  constructor(
    public readonly element: ElementRef<HTMLElement>,
    private readonly renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    setTimeout(this.position.bind(this));
  }

  @HostListener('window:resize')
  @Throttleable(100)
  onWindowResize(): void {
    this.position();
  }

  position(): void {
    const nativeElm = this.element.nativeElement;
    const hostDim = this.host?.nativeElement.getBoundingClientRect();

    // if no dims were found, never show
    if (!hostDim?.height && !hostDim?.width) return;

    const elmDim = nativeElm.getBoundingClientRect();
    this.checkFlip(hostDim, elmDim);
    this.positionContent(nativeElm, hostDim, elmDim);

    if (this.showCaret) {
      this.positionCaret(hostDim, elmDim);
    }

    // animate its entry
    setTimeout(() => this.renderer.addClass(nativeElm, 'animate'), 1);
  }

  private positionContent(
    nativeElm: HTMLElement,
    hostDim: Dimension,
    elmDim: Dimension
  ): void {
    if (this.placement && this.spacing && this.alignment) {
      const { top, left } = positionContent(
        this.placement,
        elmDim,
        hostDim,
        this.spacing,
        this.alignment
      );

      this.renderer.setStyle(nativeElm, 'top', `${top}px`);
      this.renderer.setStyle(nativeElm, 'left', `${left}px`);
    }
  }

  private positionCaret(hostDim: Dimension, elmDim: Dimension): void {
    if (this.placement && this.alignment) {
      const caretElm = this.caretElm.nativeElement;
      const caretDimensions = caretElm.getBoundingClientRect();
      const { top, left } = positionCaret(
        this.placement,
        elmDim,
        hostDim,
        caretDimensions,
        this.alignment
      );

      this.renderer.setStyle(caretElm, 'top', `${top}px`);
      this.renderer.setStyle(caretElm, 'left', `${left}px`);
    }
  }

  private checkFlip(hostDim: Dimension, elmDim: Dimension): void {
    if (this.placement && this.spacing && this.alignment) {
      this.placement = determinePlacement(
        this.placement,
        elmDim,
        hostDim,
        this.spacing,
        this.alignment
      );
    }
  }
}
