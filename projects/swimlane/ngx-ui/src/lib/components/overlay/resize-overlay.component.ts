import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HotkeysService } from '../hotkeys/hotkeys.service';

@Component({
  exportAs: 'ngxResizeOverlay',
  selector: 'ngx-resize-overlay',
  templateUrl: './resize-overlay.component.html',
  styleUrls: ['./resize-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: false
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

  get keys(): string[] {
    if (this.hotkeysService.hotKeys && this.hotkeysService.hotKeys[this.combo]) {
      return this.hotkeysService.hotKeys[this.combo][0].keys;
    } else {
      return [];
    }
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private hotkeysService: HotkeysService,
    private cdr: ChangeDetectorRef
  ) {
    this._buildObservable();
  }

  ngOnInit(): void {
    this.hotkeysService.add(this.combo, {
      callback: this.toggle.bind(this),
      description: 'Toggle browser size warning',
      visible: false,
      component: this
    });
  }

  ngOnDestroy(): void {
    this.hotkeysService.deregister(this.combo);
  }

  onClick(ev: KeyboardEvent): void {
    if (ev.metaKey && ev.shiftKey) {
      this.disabled = true;
    }
  }

  toggle(): void {
    this.disabled = !this.disabled;
  }

  private _buildObservable(): void {
    const query = Array.isArray(this.query) ? this.query : [this.query];

    this.visible$ = this.breakpointObserver.observe(query).pipe(
      map((v: any) => !v.matches),
      startWith(!this.breakpointObserver.isMatched(this.query))
    );
  }
}
