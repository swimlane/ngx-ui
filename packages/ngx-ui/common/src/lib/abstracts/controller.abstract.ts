import { Directive, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class Controller implements OnChanges {
  readonly changes$ = new Subject<SimpleChanges>();

  ngOnChanges(changes: SimpleChanges) {
    this.changes$.next(changes);
  }
}
