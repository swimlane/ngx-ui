import { ChangeDetectorRef, EmbeddedViewRef, Pipe, PipeTransform, Type } from '@angular/core';

@Pipe({
  name: 'memoize',
  pure: true,
  standalone: false
})
export class MemoizePipe implements PipeTransform {
  context: any;

  constructor(cdRef: ChangeDetectorRef) {
    this.context = (cdRef as EmbeddedViewRef<Type<any>>).context;
  }

  transform(fn: any, ...args: any[]): any {
    return fn.apply(this.context, args);
  }
}
