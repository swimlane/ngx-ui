import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  exportAs: 'ngxLoadingBar',
  selector: 'ngx-loading-bar',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  host: { class: 'ngx-loading-bar' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {
  @Input()
  get visible() {
    return this._visible;
  }
  set visible(visible: boolean) {
    this._visible = coerceBooleanProperty(visible);
    // `markForCheck` will not run change detection but will change the state of all parent components
    // to `ChecksEnabled` which means the `ApplicationRef.tick()` will run change detection on all components
    // down to this one.
    this.cdr.detectChanges();
  }

  @Input()
  get progress() {
    return this._progress;
  }
  set progress(progress: number) {
    this._progress = coerceNumberProperty(progress);
    if (this.bar) {
      this.renderer.setStyle(this.bar.nativeElement, 'width', `${this.progress}%`);
    }
  }

  @ViewChild('bar', { static: false }) bar?: ElementRef<HTMLElement>;

  private _visible: boolean = false;
  private _progress: number = 0;

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {}
}
