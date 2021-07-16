import { InjectionToken } from '@angular/core';

export const NGX_DOC_TITLE_PREFIX = new InjectionToken('Title Prefix', {
  factory: () => '',
});
