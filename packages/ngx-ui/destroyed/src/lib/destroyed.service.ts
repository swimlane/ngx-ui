import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DestroyedService extends Subject<void> implements OnDestroy {
  /**
   * Use when DestroyedService is attached on some Observable
   * that should be unsubscribed before ngOnDestroy
   */
  imperativeDestroy() {
    this.next();
  }

  ngOnDestroy() {
    this.next();
    this.complete();
  }
}
