import { Directive, Inject, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IntersectionObserveeService } from './intersection-observee.service';

@Directive({
  selector: '[ngxIntersectionObservee]',
  exportAs: 'ngxIntersectionObservee',
  providers: [IntersectionObserveeService],
})
export class IntersectionObserveeDirective {
  @Output() ngxIntersectionObservee: Observable<
    ReadonlyArray<IntersectionObserverEntry>
  >;

  constructor(
    @Inject(IntersectionObserveeService)
    readonly entries$: Observable<ReadonlyArray<IntersectionObserverEntry>>
  ) {
    this.ngxIntersectionObservee = entries$;
  }
}
