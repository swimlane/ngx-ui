/* eslint-disable no-console */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap } from 'rxjs/operators';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-selects-page',
  templateUrl: './selects-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectsPageComponent implements OnInit {
  selects = this._results;
  selectsModel = [this.selects[0]];
  singleSelectModel = this.selects[0];
  asyncOptions$: Observable<any>;
  form = new FormGroup({
    formCtrl1: new FormControl([]),
    formCtrl2: new FormControl({ value: [], disabled: true }),
    formCtrl3: new FormControl(['ddos'], [forbiddenNameValidator(/ddos/)])
  });

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

  search(query: string): void {
    query = query.toLowerCase();

    this.asyncOptions$ = fromFetch(`https://jsonplaceholder.typicode.com/posts?q=${query}`).pipe(
      switchMap(async response => {
        const body = await response.json();
        return body.filter(item => {
          item.disabled = item.id % 15 === 0;
          return item.title.toLowerCase().indexOf(query) > -1;
        });
      })
    );
  }

  ngOnInit() {
    this.search('');
  }

  onSelectKeyUp(event: KeyboardEvent) {
    console.log('key up', event);
  }

  onEvent(name: string, event: Event): void {
    console.log(name, event);
  }

  onToggleNgxSelectState(): void {
    const formControl = this.form.get('formCtrl1');
    if (formControl.enabled) {
      formControl.disable();
    } else {
      formControl.enable();
    }
  }
}
