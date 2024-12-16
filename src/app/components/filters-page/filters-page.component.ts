/* eslint-disable no-console */
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
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
  selector: 'app-filters-page',
  templateUrl: './filters-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersPageComponent implements OnInit {
  selects = this._results;
  selectsModel = [this.selects[0]];
  singleSelectModel = this.selects[0];
  asyncOptions$: Observable<any>;
  form = new UntypedFormGroup({
    formCtrl1: new UntypedFormControl([]),
    formCtrl2: new UntypedFormControl({ value: [], disabled: true }),
    formCtrl3: new UntypedFormControl(['ddos'], [forbiddenNameValidator(/ddos/)])
  });

  aLongString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  aVeryLongString =
    'Lorem_ipsum_dolor_sit_amet,_consectetur_adipiscing_elit._Sed_lectus_elit,_malesuada_quis_blandit_nec,_sodales_vel_quam._Sed_id_justo_est._Nullam_ut_tortor_urna._Nullam_nec_nibh_lobortis,_pellentesque_ex_at,_mollis_lectus._Sed_vehicula_imperdiet_pulvinar._Donec_ante_orci,_imperdiet_scelerisque_elit_a,_cursus_consectetur_ipsum._Etiam_tristique_orci_id_tortor_sodales,_at_molestie_nunc_porta._Etiam_fermentum_semper_libero_ut_feugiat._Praesent_tincidunt_laoreet_urna,_eget_iaculis_libero_condimentum_ac._Integer_porta_arcu_a_diam_dictum_suscipit.';

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

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
