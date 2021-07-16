import { InjectionToken } from '@angular/core';
import { DocContentHandler } from '../models';

export function noopProcessor<TParameters>(
  parameters: TParameters
): TParameters {
  return parameters;
}

export const NGX_DOC_CONTENT_PROCESSOR = new InjectionToken<
  DocContentHandler<Record<string, string>, Record<string, string>>
>('Doc Content Processor', {
  factory: () => noopProcessor,
});
