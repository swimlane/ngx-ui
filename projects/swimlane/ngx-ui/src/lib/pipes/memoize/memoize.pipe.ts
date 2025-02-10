import { ChangeDetectorRef, EmbeddedViewRef, Pipe, PipeTransform, Type, inject } from '@angular/core';

@Pipe({
  name: 'memoize',
  pure: true,
  standalone: false
})
export class MemoizePipe implements PipeTransform {
  context: any;
  cdRef = inject(ChangeDetectorRef);

  constructor() {
    this.context = (this.cdRef as EmbeddedViewRef<Type<any>>).context;
  }

  transform(fn: any, ...args: any[]): any {
    return fn.apply(this.context, args);
  }
}
