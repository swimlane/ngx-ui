import { ChangeDetectionStrategy, Component } from '@angular/core';
import { timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'ngx-selects',
  templateUrl: './selects.component.html',
  styleUrls: ['./selects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectsComponent {
  selects = SelectsComponent.results;
  singleSelectModel = this.selects[0];
  asyncOptions$ = timer(5000).pipe(mapTo(SelectsComponent.results));

  private static get results() {
    let i = 50;
    const results: unknown[] = [];

    while (i--) {
      results.push({
        name: `option ${i}`,
        attr: `${i}_intrusion_breach`,
        address: `${i} rd`,
        disabled: i === 48,
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

  basicSingleMd = `
    \`\`\`html
    <ngx-select [filterable]="false" label="Attack Type">
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  basicRequiredMd = `
    \`\`\`html
    <ngx-select [filterable]="false" label="Attack Type" required>
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  basicFilteringMd = `
    \`\`\`html
    <ngx-select label="Filtering attack type">
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  basicFilteringCaseSensitiveMd = `
    \`\`\`html
    <ngx-select label="Filtering attack type" filterCaseSensitive>
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  basicAddNewMd = `
    \`\`\`html
    <ngx-select
      label="Filter and add new"
      allowAdditions
      [allowAdditionsText]="'Add new value'"
      (keyup)="onKeyup($event)"
    >
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  basicLongValuesMd = `
    \`\`\`html
    <ngx-select
      style="max-width: 300px"
      [ngModel]="[
        'supercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocious'
      ]"
    >
      <ngx-select-option
        name="supercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocious"
        value="supercalifragilisticexpialidocioussupercalifragilisticexpialidocioussupercalifragilisticexpialidocious"
      ></ngx-select-option>
      <ngx-select-option
        name="supe rcalifragilist icexpialidocious"
        value="s2344"
      ></ngx-select-option>
      <ngx-select-option
        name="super califragilisticex pialidoc ious"
        value="s3121"
      ></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  basicNgForTsMd = `
    \`\`\`ts
    @Component({})
    export class AppComponent {
      get selects() {
        let i = 50;
        const results: unknown[] = [];

        while (i--) {
          results.push({
            name: \`option $\{i\}\`,
            attr: \`$\{i\}_intrusion_breach\`,
            address: \`$\{i\} rd\`,
            disabled: i === 48,
          });
        }

        return results;
      }
    }
    \`\`\`
  `;

  basicNgForHtmlMd = `
    \`\`\`html
    <ngx-select
      identifier="attr"
      [ngModel]="[selects[0]]"
      label="Select a value..."
    >
      <ngx-select-option
        *ngFor="let option of selects"
        [value]="option"
        [name]="option.name"
        [disabled]="option.disabled"
      ></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  basicNgFor = {
    Markup: this.basicNgForHtmlMd,
    TypeScript: this.basicNgForTsMd,
  };

  basicSingleSelectTsMd = `
    \`\`\`ts
    @Component({})
    export class AppComponent {
      get selects() {
        let i = 50;
        const results: unknown[] = [];

        while (i--) {
          results.push({
            name: \`option $\{i\}\`,
            attr: \`$\{i\}_intrusion_breach\`,
            address: \`$\{i\} rd\`,
            disabled: i === 48,
          });
        }

        return results;
      }

      singleSelectModel = this.selects[0];
    }
    \`\`\`
  `;
  basicSingleSelectHtmlMd = `
    \`\`\`html
    Selected: <pre>{{ singleSelectModel | json }}</pre>
    <ngx-select
      identifier="attr"
      [ngModel]="[singleSelectModel]"
      (ngModelChange)="singleSelectModel = $event[0]"
      label="Select a value..."
    >
      <ngx-select-option
        *ngFor="let option of selects"
        [value]="option"
        [name]="option.name"
        [disabled]="option.disabled"
      ></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;
  basicSingleSelect = {
    Markup: this.basicSingleSelectHtmlMd,
    TypeScript: this.basicSingleSelectTsMd,
  };

  basicCustomTemplateMd = `
    \`\`\`html
    <ngx-select label="Custom template...">
      <ngx-select-option value="breach">
        <ng-template ngx-select-option-input-template let-option="option">
          <span class="ngx-tag">{{ option.value }}</span>
        </ng-template>
        <ng-template ngx-select-option-template let-option="option">
          <i class="ngx-icon ngx-bug"></i>
          {{ option.value }}
        </ng-template>
      </ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical">
        <ng-template ngx-select-option-template let-option="option">
          <i class="ngx-icon ngx-chart-spider"></i>
          {{ option.value }}
        </ng-template>
      </ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  basicGroupByMd = `
    \`\`\`html
    <ngx-select groupBy="type">
      <ngx-select-option
        [name]="'Breach'"
        [value]="{ value: 'breach', type: 'IOS' }"
      ></ngx-select-option>
      <ngx-select-option
        [name]="'DDOS'"
        [value]="{ value: 'ddos', type: 'IOS' }"
      ></ngx-select-option>
      <ngx-select-option
        [name]="'Physical'"
        [value]="{ value: 'Physical', type: 'MOX' }"
      ></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  basicGroupByCustomTemplateMd = `
    \`\`\`html
    <ngx-select
      groupBy="type"
      [groupByTemplate]="groupByTemplate"
      label="Grouping with custom template..."
    >
      <ngx-select-option
        [name]="'Breach'"
        [value]="{ value: 'breach', type: 'IOS' }"
      ></ngx-select-option>
      <ngx-select-option
        [name]="'DDOS'"
        [value]="{ value: 'ddos', type: 'IOS' }"
      ></ngx-select-option>
      <ngx-select-option
        [name]="'Physical'"
        [value]="{ value: 'Physical', type: 'MOX' }"
      ></ngx-select-option>
    </ngx-select>
    <ng-template #groupByTemplate let-name="groupName">
      {{ name }}
      <ng-container [ngSwitch]="name">
        <ng-container *ngSwitchCase="'IOS'">🔥🔥🔥</ng-container>
        <ng-container *ngSwitchDefault>🎄🎄🎄</ng-container>
      </ng-container>
    </ng-template>
    \`\`\`
  `;

  basicDisabledOptionsMd = `
    \`\`\`html
    <ngx-select placeholder="Select incident type...">
      <ngx-select-option [name]="'Breach'" [value]="'breach'"></ngx-select-option>
      <ngx-select-option
        [name]="'DDOS'"
        [value]="'ddos'"
        disabled
      ></ngx-select-option>
      <ngx-select-option
        [name]="'Physical'"
        [value]="'pyhs'"
        disabled
      ></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  basicHiddenPreSelectMd = `
    \`\`\`html
    <ngx-select [ngModel]="['Breach']">
      <ngx-select-option
        [name]="'Breach'"
        [value]="'Breach'"
        hidden
      ></ngx-select-option>
      <ngx-select-option
        [name]="'DDOS'"
        [value]="'ddos'"
        disabled
      ></ngx-select-option>
      <ngx-select-option
        [name]="'Physical'"
        [value]="'Physical'"
        disabled
      ></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  basicNoOptionsMd = `
    \`\`\`html
    <ngx-select [filterable]="false"></ngx-select>
    \`\`\`
  `;

  basicEventsMd = `
    \`\`\`html
    <ngx-select
      label="Attack Type"
      (change)="onEvent('ngx-select change', $event)"
      (keyup)="onEvent('ngx-select change', $event)"
      (toggle)="onEvent('ngx-select toggle', $event)"
    >
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  basicCustomizationMd = `
    \`\`\`html
    <ngx-select
      allowAdditions
      allowAdditionsText="Add New Value"
      [selectCaret]="doubleDown"
    >
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>

    <ng-template #doubleDown>
      <ngx-icon fontIcon="double-down"></ngx-icon>
    </ng-template>
    \`\`\`
  `;

  multiSelectMd = `
    \`\`\`html
    <ngx-select multiple>
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  multiSelectMinMaxMd = `
    \`\`\`html
    <ngx-select
      label="Select one or two"
      [filterable]="false"
      multiple
      minSelections="1"
      maxSelections="2"
    >
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  multiSelectCloseOnSelectMd = `
    \`\`\`html
    <ngx-select [filterable]="false" multiple closeOnSelect>
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  multiSelectDefaultSelectionsTsMd = `
    \`\`\`ts
    @Component({})
    export class AppComponent {
      get selects() {
        let i = 50;
        const results: unknown[] = [];

        while (i--) {
          results.push({
            name: \`option $\{i\}\`,
            attr: \`$\{i\}_intrusion_breach\`,
            address: \`$\{i\} rd\`,
            disabled: i === 48,
          });
        }

        return results;
      }
    }
    \`\`\`
  `;
  multiSelectDefaultSelectionsHtmlMd = `
    \`\`\`html
    <ngx-select
      multiple
      [identifier]="'attr'"
      [ngModel]="[
        selects[0],
        selects[1],
        selects[2],
        selects[3],
        selects[4],
        selects[5],
        selects[6],
        selects[7],
        selects[8]
      ]"
    >
      <ngx-select-option
        *ngFor="let option of selects"
        [name]="option.name"
        [disabled]="option.disabled"
        [value]="option"
      ></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;
  multiSelectDefaultSelectionsMd = {
    Markup: this.multiSelectDefaultSelectionsHtmlMd,
    TypeScrit: this.multiSelectDefaultSelectionsTsMd,
  };

  multiSelectCustomTemplateMd = `
    \`\`\`html
    <ngx-select multiple identifier="attr" [ngModel]="[selects[0]]">
      <ngx-select-option
        *ngFor="let option of selects"
        [name]="option.name"
        [disabled]="option.disabled"
        [value]="option"
      >
        <ng-template ngx-select-option-input-template let-option="option">
          <i class="ngx-icon ngx-bug"></i>
          {{ option.value.name }}
        </ng-template>
      </ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  taggingMd = `
    \`\`\`html
    <ngx-select [filterable]="false" tagging>
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  taggingNoOptionsMd = `
    \`\`\`html
    <ngx-select [filterable]="false" tagging>
    \`\`\`
  `;

  nativeMd = `
    \`\`\`html
    <select>
      <option>Red</option>
      <option>Blue</option>
      <option>Green</option>
    </select>
    \`\`\`
  `;

  asyncTsMd = `
    \`\`\`ts
    @Component({})
    export class AppComponent {
      asyncOptions$ = timer(5000).pipe(mapTo(this.selects));

      get selects() {
        let i = 50;
        const results: unknown[] = [];

        while (i--) {
          results.push({
            name: \`option $\{i\}\`,
            attr: \`$\{i\}_intrusion_breach\`,
            address: \`$\{i\} rd\`,
            disabled: i === 48,
          });
        }

        return results;
      }
    }
    \`\`\`
  `;
  asyncHtmlMd = `
    \`\`\`html
    <ngx-select>
      <ngx-select-option
        *ngFor="let option of asyncOptions$ | async"
        [name]="option.name"
        [value]="option"
        [disabled]="option.disabled"
      ></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;
  asyncMd = {
    Markup: this.asyncHtmlMd,
    TypeScript: this.asyncTsMd,
  };

  appearanceMd = `
    \`\`\`html
    <ngx-select [filterable]="false" appearance="legacy">
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>

    <ngx-select
      [filterable]="false"
      appearance="legacy"
      label="Legacy input with autosize"
      autosize
    >
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
      <ngx-select-option
        name="Really long option to show autosize of the component when autosize is selected"
        value="Really long option to show autosize of the component when autosize is selected"
      ></ngx-select-option>
    </ngx-select>

    <ngx-select [filterable]="false" appearance="fill">
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option
        name="a very long choice that you need to make"
        value="ddos"
      ></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>

    <ngx-select [filterable]="true" appearance="fill" label="Fill With Search">
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>

    <ngx-select
      [filterable]="false"
      multiple
      appearance="fill"
      label="Fill With Multiple Selections"
    >
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>

    <ngx-select
      [filterable]="false"
      tagging
      appearance="fill"
      label="Fill With Tagging"
    >
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>

    <ngx-select
      [filterable]="false"
      tagging
      appearance="fill"
      label="Fill Tagging With No Options"
    ></ngx-select>

    <ngx-select
      [filterable]="false"
      tagging
      appearance="fill"
      label="Fill With Grouping"
      groupBy="type"
    >
      <ngx-select-option
        name="Breach"
        [value]="{ value: 'breach', type: 'IOS' }"
      ></ngx-select-option>
      <ngx-select-option
        name="DDOS"
        [value]="{ value: 'ddos', type: 'IOS' }"
      ></ngx-select-option>
      <ngx-select-option
        name="Physical"
        [value]="{ value: 'Physical', type: 'MOX' }"
      ></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;

  appearanceAutoSizeMd = `
    \`\`\`html
    <ngx-select
      [filterable]="false"
      appearance="fill"
      label="Fill Input"
      hint="im a hint"
      placeholder="Select a value..."
      autosize
    >
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option
        name="Physical"
        value="physical"
        disabled
      ></ngx-select-option>
    </ngx-select>

    <ngx-select appearance="fill" label="Fill With Search" autosize>
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>

    <ngx-select
      [filterable]="false"
      multiple
      appearance="fill"
      label="Fill With Multiple Selections"
      autosize
    >
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>

    <ngx-select
      [filterable]="false"
      tagging
      appearance="fill"
      label="Fill With Tagging"
      autosize
    >
      <ngx-select-option name="Breach" value="breach"></ngx-select-option>
      <ngx-select-option name="DDOS" value="ddos"></ngx-select-option>
      <ngx-select-option name="Physical" value="physical"></ngx-select-option>
    </ngx-select>

    <ngx-select
      [filterable]="false"
      tagging
      appearance="fill"
      label="Fill Tagging With No Options"
      autosize
    ></ngx-select>

    <ngx-select
      [filterable]="false"
      tagging
      appearance="fill"
      label="Fill With Grouping"
      groupBy="type"
      autosize
    >
      <ngx-select-option
        name="Breach"
        [value]="{ value: 'breach', type: 'IOS' }"
      ></ngx-select-option>
      <ngx-select-option
        name="DDOS"
        [value]="{ value: 'ddos', type: 'IOS' }"
      ></ngx-select-option>
      <ngx-select-option
        name="Physical"
        [value]="{ value: 'Physical', type: 'MOX' }"
      ></ngx-select-option>
    </ngx-select>
    \`\`\`
  `;
}
