import type { DialogOptions } from '@swimlane/ngx-ui/dialog';
import { AlertStyle, AlertType } from '../enums';

export interface AlertOptions extends DialogOptions {
  readonly type?: AlertType;
  readonly style?: AlertStyle;
  readonly inputs?: DialogOptions['inputs'] & {
    type?: AlertType;
    style?: AlertStyle;
  };
}
