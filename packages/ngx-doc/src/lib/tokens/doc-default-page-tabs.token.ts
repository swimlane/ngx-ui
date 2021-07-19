import { InjectionToken } from '@angular/core';

export const NGX_DOC_DEFAULT_PAGE_TABS = new InjectionToken<string[]>(
  'Default Tabs label for multiple tabs Doc Page',
  {
    factory: () => ['Description and Examples', 'API', 'Setup'],
  }
);
