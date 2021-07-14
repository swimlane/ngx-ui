import { NgZone, Type } from '@angular/core';

export interface HotkeyOptions {
  readonly callback: (..._: unknown[]) => void;
  readonly description: string;
  readonly component: Type<unknown>;
  readonly zone: NgZone;
  status?: string;
  keys?: string[];
  visible?: boolean;
  allowIn?: string[];
}

export type Hotkeys = Record<string, HotkeyOptions[]>;
