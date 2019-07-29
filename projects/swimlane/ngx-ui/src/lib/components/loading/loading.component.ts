import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-loading-bar',
  template: `
    <div class="ngx-loading-bar" [hidden]="!visible">
      <div class="ngx-loading-bar-bar" [ngStyle]="{'width': progress + '%'}"></div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent {
  private _visible: boolean = false;
  private _progress: number = 0;

  constructor(private cd: ChangeDetectorRef) {}

  set progress(val: number) {
    this.cd.markForCheck();
    this._progress = val;
  }

  get progress() {
    return this._progress;
  }

  set visible(val: boolean) {
    this.cd.markForCheck();
    this._visible = val;
  }

  get visible() {
    return this._visible;
  }
}
