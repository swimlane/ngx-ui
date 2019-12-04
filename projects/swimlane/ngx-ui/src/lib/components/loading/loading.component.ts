import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'ngx-loading-bar',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  host: { class: 'ngx-loading-bar' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {
  @Input()
  get visible() { return this._visible; }
  set visible(visible: boolean) {
    this._visible = coerceBooleanProperty(visible);
    this.cdr.markForCheck();
  }

  @Input()
  get progress() { return this._progress; }
  set progress(progress: number) {
    this._progress = coerceNumberProperty(progress);
    this.cdr.markForCheck();
  }

  private _visible: boolean = false;
  private _progress: number = 0;

  constructor(private cdr: ChangeDetectorRef) { }
}
