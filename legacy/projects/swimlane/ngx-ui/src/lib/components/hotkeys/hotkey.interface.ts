import { NgZone } from '@angular/core';

export interface Hotkey {
  readonly callback: (..._: any[]) => void;
  readonly description: string;
  readonly component: any;
  readonly zone?: NgZone;
  status?: string;
  keys?: string[];
  visible?: boolean;
  allowIn?: string[];
}
