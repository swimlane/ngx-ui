import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const NGX_DOC_TITLE = new InjectionToken<Observable<string>>(
  'Doc Navigation Title'
);
