import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  NgZone,
  Output,
} from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Directive({
  selector: '[visibilityObserver]',
})
export class VisibilityDirective {
  @HostBinding('class.visible') isVisible = false;

  @Output() visible = new EventEmitter<boolean>();

  private checkSubscription?: Subscription;

  constructor(
    private readonly element: ElementRef<HTMLElement>,
    private readonly zone: NgZone
  ) {}

  ngOnInit(): void {
    this.runCheck();
  }

  onVisibilityChange(): void {
    // trigger zone recalc for columns
    this.zone.run(() => {
      this.isVisible = true;
      this.visible.emit(true);
    });
  }

  runCheck(): void {
    const check = () => {
      // https://davidwalsh.name/offsetheight-visibility
      const { offsetHeight, offsetWidth } = this.element.nativeElement;

      this.checkSubscription?.unsubscribe();
      if (offsetHeight && offsetWidth) {
        this.onVisibilityChange();
      } else {
        this.zone.runOutsideAngular(() => {
          this.checkSubscription = timer(50).subscribe(check.bind(this));
        });
      }
    };

    timer().subscribe(check.bind(this));
  }
}
