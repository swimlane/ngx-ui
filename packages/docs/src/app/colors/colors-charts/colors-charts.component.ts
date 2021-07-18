import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'docs-colors-charts',
  template: `
    <ngx-doc-example heading="Ordinal Charts" id="ordinal-charts">
      <div class="colors-charts">
        <section
          class="colors-charts__chart"
          *ngFor="let ordinalChart of chartColorsOrdinal"
        >
          <h5 class="colors-charts__title">{{ ordinalChart.name }}</h5>
          <docs-color-block
            *ngFor="let color of ordinalChart.colors"
            [hex]="color"
          ></docs-color-block>
        </section>
      </div>
    </ngx-doc-example>

    <ngx-doc-example heading="Sequential Charts" id="sequential-charts">
      <div class="colors-charts">
        <section
          class="colors-charts__chart"
          *ngFor="let ordinalChart of chartColorsSequential"
        >
          <h5 class="colors-charts__title">{{ ordinalChart.name }}</h5>
          <docs-color-block
            *ngFor="let color of ordinalChart.colors"
            [hex]="color"
          ></docs-color-block>
        </section>
      </div>
    </ngx-doc-example>
  `,
  styles: [
    // language=scss
    `
      .colors-charts {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        &__chart {
          display: grid;
          grid-template-columns: repeat(11, minmax(0, 1fr));
          column-gap: 1rem;
        }

        &__title {
          font-size: larger;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsChartsComponent {
  chartColorsOrdinal = [
    {
      name: 'Vivid',
      colors: [
        '#62CD8C',
        '#3D4EB4',
        '#1594F2',
        '#00B965',
        '#B7DF3F',
        '#99B726',
        '#F4E667',
        '#FF990D',
        '#FF5821',
        '#D24018',
      ],
    },
    {
      name: 'Natural',
      colors: [
        '#C09E77',
        '#EA9551',
        '#D9A05B',
        '#F2E0A8',
        '#F2E0A8',
        '#A4D7C6',
        '#7693B1',
        '#AFAFAF',
        '#707160',
        '#D9D5C3',
      ],
    },
    {
      name: 'Cool',
      colors: [
        '#ACCCED',
        '#A9E3F5',
        '#7CD2ED',
        '#4DAACC',
        '#79A2E4',
        '#8695BF',
        '#A27DA7',
        '#AE6785',
        '#AA5963',
        '#A9375C',
      ],
    },
    {
      name: 'Fire',
      colors: [
        '#FF3E00',
        '#C0370A',
        '#FF900B',
        '#FF7002',
        '#FF3E00',
        '#FF5821',
        '#E75200',
        '#FFCC31',
        '#FFAC12',
        '#FF7002',
      ],
    },
  ];

  chartColorsSequential = [
    {
      name: 'Solar',
      colors: [
        '#FFF8E1',
        '#FFEDB4',
        '#FFE184',
        '#FFD654',
        '#FFCC31',
        '#FFC31B',
        '#FFB414',
        '#FFA10F',
        '#FF900B',
        '#FF7002',
      ],
    },
    {
      name: 'Air',
      colors: [
        '#E1F5FE',
        '#B2E5FC',
        '#7FD3F9',
        '#4AC2F6',
        '#1EB5F5',
        '#00A7F3',
        '#0099E4',
        '#0086D0',
        '#0075BC',
        '#00559A',
      ],
    },
    {
      name: 'Aqua',
      colors: [
        '#E0F7FA',
        '#B1EBF2',
        '#7EDEEA',
        '#48D0E1',
        '#1AC6DA',
        '#00BBD4',
        '#00ACC1',
        '#0097A7',
        '#00838F',
        '#006064',
      ],
    },
  ];
}
