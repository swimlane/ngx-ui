/* eslint-disable no-console */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-selects-page',
  templateUrl: './selects-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectsPageComponent implements OnInit {
  selects = this._results;
  selectsModel = [this.selects[0]];
  singleSelectModel = this.selects[0];
  asyncOptions$: Observable<any[]>;

  private get _results() {
    let i = 50;
    const results: any[] = [];

    while (i--) {
      results.push({
        name: `option ${i}`,
        attr: `${i}_intrusion_breach`,
        address: `${i} rd`,
        disabled: i === 48
      });
    }

    return results;
  }

  ngOnInit() {
    this.asyncOptions$ = timer(0, 5000).pipe(map(() => this._results));
  }

  onSelectKeyUp(event: KeyboardEvent) {
    console.log('key up', event);
  }

  onEvent(name: string, event: Event): void {
    console.log(name, event);
  }
}
