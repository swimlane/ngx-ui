/* eslint-disable no-console */
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  inputBinding,
  OnInit,
  Output,
  outputBinding
} from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TreeComponent } from '@swimlane/ngx-ui';
import { FilterCustomDropdown } from '@swimlane/ngx-ui/components/filter/filter.custom-component.interface';
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
  styleUrls: ['./filters-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class FiltersPageComponent implements OnInit {
  buttonClicks = 0;
  customDropdownText = null;
  customDropdownFilterCount = 0;
  customDropdownClicks = 0;
  customDropdownToggle = null;
  dropdownClicks = 0;
  dropdownChange = null;
  dropdownKeyUp = null;
  dropdownToggle = false;
  dropdownClearQueryFilter = 0;
  selects = this._results;
  selectsSmall = this.selects.slice(0, 5);
  selectsModel = [this.selects[0]];
  singleSelectModel = this.selects[0];
  asyncOptions$: Observable<any>;
  form = new UntypedFormGroup({
    formCtrl1: new UntypedFormControl([]),
    formCtrl2: new UntypedFormControl({ value: [], disabled: true }),
    formCtrl3: new UntypedFormControl(['ddos'], [forbiddenNameValidator(/ddos/)])
  });
  customDropdownCounterBasicConfig: FilterCustomDropdown;
  customDropdownCounterCaretConfig: FilterCustomDropdown;
  customDropdownCounterCloseConfig: FilterCustomDropdown;
  customDropdownCounterConfig: FilterCustomDropdown;
  customDropdownConfigTreeCss: FilterCustomDropdown;
  customDropdownConfigTree: FilterCustomDropdown;

  aLongString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  aVeryLongString =
    'Lorem_ipsum_dolor_sit_amet,_consectetur_adipiscing_elit._Sed_lectus_elit,_malesuada_quis_blandit_nec,_sodales_vel_quam._Sed_id_justo_est._Nullam_ut_tortor_urna._Nullam_nec_nibh_lobortis,_pellentesque_ex_at,_mollis_lectus._Sed_vehicula_imperdiet_pulvinar._Donec_ante_orci,_imperdiet_scelerisque_elit_a,_cursus_consectetur_ipsum._Etiam_tristique_orci_id_tortor_sodales,_at_molestie_nunc_porta._Etiam_fermentum_semper_libero_ut_feugiat._Praesent_tincidunt_laoreet_urna,_eget_iaculis_libero_condimentum_ac._Integer_porta_arcu_a_diam_dictum_suscipit.';

  treeNodes: any[] = [
    {
      label: 'Europe',
      expandable: true,
      expanded: true,
      selectable: true,
      children: [
        { label: 'England', selectable: true },
        { label: 'Germany', selectable: true },
        { label: 'Italy', selectable: true },
        { label: 'Poland', selectable: true }
      ]
    },
    {
      label: 'America',
      expandable: true,
      expanded: true,
      selectable: true,
      children: [
        {
          label: 'North America',
          expandable: true,
          expanded: true,
          selectable: true,
          children: [
            { label: 'Canada', selectable: true },
            { label: 'Mexico', selectable: true },
            { label: 'United States', selectable: true }
          ]
        },
        {
          label: 'Central America',
          expandable: true,
          expanded: true,
          selectable: true,
          children: [
            { label: 'Costa Rica', selectable: true },
            { label: 'Honduras', selectable: true },
            { label: 'Panama', selectable: true }
          ]
        },
        {
          label: 'South America',
          expandable: true,
          expanded: true,
          selectable: true,
          children: [
            { label: 'Argentina', selectable: true },
            { label: 'Brazil', selectable: true },
            { label: 'Chile', selectable: true },
            { label: 'Ecuador', selectable: true }
          ]
        }
      ]
    }
  ];

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

  ngOnInit(): void {
    this.search('');
    this.initializeCustomComponents();
  }

  initializeCustomComponents(): void {
    this.customDropdownCounterBasicConfig = {
      component: {
        type: MyCustomComponent
      }
    };

    this.customDropdownCounterCaretConfig = {
      component: {
        type: MyCustomComponent
      },
      showCaret: true
    };

    this.customDropdownCounterCloseConfig = {
      component: {
        type: MyCustomComponent
      },
      closeOnClick: false,
      closeOnOutsideClick: true
    };

    this.customDropdownCounterConfig = {
      component: {
        type: MyCustomComponent,
        options: {
          bindings: [
            inputBinding('counter', () => 0),
            outputBinding('myCustomComponentOutput1', event => this.onCustomDropdownClickedButton(event)),
            outputBinding('myCustomComponentOutput2', event => this.onCustomDropdownCounterChanged(event))
          ]
        }
      },
      closeOnClick: false,
      closeOnOutsideClick: true
    };

    this.customDropdownConfigTreeCss = {
      component: {
        type: TreeComponent,
        options: {
          bindings: [inputBinding('nodes', () => this.treeNodes)]
        }
      },
      containerClasses: ['custom-container-css-class-red']
    };

    this.customDropdownConfigTree = {
      component: {
        type: TreeComponent,
        options: {
          bindings: [inputBinding('nodes', () => this.treeNodes)]
        }
      },
      containerClasses: ['custom-container-css-class']
    };
  }

  onCustomDropdownClickedButton(event: any) {
    this.customDropdownText = event;
  }

  onCustomDropdownCounterChanged(event: any) {
    this.customDropdownFilterCount = event;
  }

  onSelectKeyUp(event: KeyboardEvent): void {
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

  scrollTo(id: string): void {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }

  onButtonClick(): void {
    this.buttonClicks++;
  }

  onDropdownClick(): void {
    this.dropdownClicks++;
  }

  onCustomDropdownClick(): void {
    this.customDropdownClicks++;
  }

  onCustomDropdownToggle(event: any): void {
    this.customDropdownToggle = event;
  }

  onDropdownChange(event: any): void {
    this.dropdownChange = event;
  }

  onDropdownKeyup(event: any): void {
    this.dropdownKeyUp = event;
  }

  onDropdownToggle(event: any): void {
    this.dropdownToggle = event;
  }

  onDropDownClearQuery(): void {
    this.dropdownClearQueryFilter++;
  }
}

@Component({
  selector: 'my-custom-component',
  styles: [
    `
      .my-custom-component-container {
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 5px;
        gap: 5px;

        span {
          padding-left: 5px;
          padding-right: 15px;
          font-style: italic;
        }
      }
    `
  ],
  template: ` <div class="my-custom-component-container">
    <span>Iterations:</span>
    <button type="button" class="btn btn-primary" (click)="onMinusClicked()"><i class="ngx-icon ngx-minus"></i></button>
    {{ counter }}
    <button type="button" class="btn btn-primary" (click)="onPlusClicked()"><i class="ngx-icon ngx-plus"></i></button>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class MyCustomComponent {
  @Input() counter = 0;
  @Output() myCustomComponentOutput1 = new EventEmitter<string>();
  @Output() myCustomComponentOutput2 = new EventEmitter<number>();

  onMinusClicked(): void {
    this.counter--;
    this.myCustomComponentOutput1.emit('Minus');
    this.myCustomComponentOutput2.emit(this.counter);
  }

  onPlusClicked(): void {
    this.counter++;
    this.myCustomComponentOutput1.emit('Plus');
    this.myCustomComponentOutput2.emit(this.counter);
  }
}
