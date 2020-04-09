import {
  Component,
  Input,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { ɵMatchMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HotkeysService } from '../hotkeys/hotkeys.service';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'ngx-resize-overlay',
  templateUrl: './resize-overlay.component.html',
  styleUrls: ['./resize-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ResizeOverlayComponent implements OnInit, OnDestroy {
  @Input() combo = 'ctrl+shift+o';

  @Input()
  get query(): string {
    return this._query;
  }

  set query(value: string) {
    this._query = value;
    this._buildObservable();
  }

  @Input()
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.cdr.markForCheck();
    localStorage.setItem('overlay-disabled', value.toString());
  }

  get disabled(): boolean {
    return this._disabled;
  }

  visible$: Observable<boolean>;

  private _disabled: boolean = localStorage.getItem('overlay-disabled') === 'true';
  private _query = '(min-width: 959px) and (min-height: 650px)';

  get keys() {
    if (this.hotkeysService.hotkeys && this.hotkeysService.hotkeys[this.combo]) {
      return this.hotkeysService.hotkeys[this.combo][0].keys;
    }
    return [];
  }

  constructor(
    private mediaWatcher: ɵMatchMedia,
    private hotkeysService: HotkeysService,
    private cdr: ChangeDetectorRef
  ) {
    this._buildObservable();
  }

  ngOnInit() {
    this.hotkeysService.add(this.combo, {
      callback: this.toggle.bind(this),
      description: 'Toggle browser size warning',
      visible: false,
      component: this
    });
  }

  ngOnDestroy() {
    this.hotkeysService.deregister(this.combo);
  }

  onClick(ev: any) {
    if (ev.metaKey && ev.shiftKey) {
      this.disabled = true;
    }
  }

  toggle() {
    this.disabled = !this.disabled;
  }

  private _buildObservable() {
    const query = Array.isArray(this.query) ? this.query : [this.query];
    this.visible$ = this.mediaWatcher.observe(query, true).pipe(
      map((v: any) => !v.matches),
      startWith(!this.mediaWatcher.isActive(this.query))
    );
  }
}
