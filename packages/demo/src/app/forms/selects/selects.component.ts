import { ChangeDetectionStrategy, Component } from '@angular/core';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'ngx-selects',
  templateUrl: './selects.component.html',
  styleUrls: ['./selects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: true
})
export class SelectsComponent {
  selects = this.results;
  singleSelectModel = this.selects[0];
  asyncOptions$ = timer(5000).pipe(mapTo(this.results));

  private get results() {
    let i = 50;
    const results: unknown[] = [];

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

  onKeyup($event: { event: KeyboardEvent; value?: string }) {
    console.log('keyup', $event);
  }

  onEvent(name: string, event: unknown): void {
    console.log(name, event);
  }
}
