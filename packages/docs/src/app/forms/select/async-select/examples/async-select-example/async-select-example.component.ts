import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'docs-async-select-example',
  templateUrl: './async-select-example.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsyncSelectExampleComponent {
  asyncOptions$: Observable<SearchItem[]> | undefined;

  selectControl = new FormControl([]);

  search(query: string) {
    this.asyncOptions$ = fromFetch(
      `https://jsonplaceholder.typicode.com/posts?q=${query.toLowerCase()}`
    ).pipe(
      switchMap((response) => response.json()),
      map((body: SearchItem[]) =>
        body.filter((item) => {
          item.isDisabled = item.id % 15 === 0;
          return item.title.toLowerCase().includes(query);
        })
      )
    );
  }
}

interface SearchItem {
  userId: string;
  id: number;
  title: string;
  body: string;
  isDisabled?: boolean;
}
