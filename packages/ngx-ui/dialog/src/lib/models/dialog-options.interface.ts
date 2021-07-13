import { TemplateRef } from '@angular/core';
import { PartialBindingsNoInput } from '@swimlane/ngx-ui/common';
import { DialogFormat } from '../enums';

export interface DialogOptions extends PartialBindingsNoInput {
  readonly title?: string;
  readonly content?: string;
  readonly template?: TemplateRef<unknown>;
  readonly cssClass?: string;
  readonly context?: unknown;
  readonly class?: string;
  readonly closeOnBlur?: boolean;
  readonly closeOnEscape?: boolean;
  readonly closeButton?: boolean;
  readonly visible?: boolean;
  readonly longPress?: boolean;
  readonly showOverlay?: boolean;
  readonly zIndex?: number;
  readonly confirmButtonText?: string;
  readonly confirmButtonClass?: string | string[];
  readonly cancelButtonText?: string;
  readonly cancelButtonClass?: string | string[];
  readonly format?: DialogFormat;
  readonly inputs?: {
    title?: string;
    content?: string;
    template?: TemplateRef<unknown>;
    cssClass?: string;
    context?: any;
    class?: string;
    closeOnBlur?: boolean;
    closeOnEscape?: boolean;
    closeButton?: boolean;
    visible?: boolean;
    longPress?: boolean;
    showOverlay?: boolean;
    zIndex?: number;
  };
}
