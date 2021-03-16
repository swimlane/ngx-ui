import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

const NORMAL_WEIGHTS = [
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
];

const EXTENDED_WEIGHTS = [
  '050',
  '100',
  '150',
  '200',
  '250',
  '300',
  '350',
  '400',
  '450',
  '500',
  '550',
  '600',
  '650',
  '700',
  '725',
  '750',
  '775',
  '800',
  '825',
  '850',
  '875',
  '900',
];

@Component({
  selector: 'demo-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsComponent implements OnInit {
  normalWeights = NORMAL_WEIGHTS;
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

  hues = {
    blue: {
      text: 'Blue',
      weights: NORMAL_WEIGHTS,
    },
    'light-blue': {
      text: 'Light Blue',
      weights: NORMAL_WEIGHTS,
    },
    green: {
      text: 'Green',
      weights: NORMAL_WEIGHTS,
    },
    red: {
      text: 'Red',
      weights: NORMAL_WEIGHTS,
    },
    orange: {
      text: 'Orange',
      weights: NORMAL_WEIGHTS,
    },
    purple: {
      text: 'Purple',
      weights: NORMAL_WEIGHTS,
    },
  };

  extendedHues = {
    grey: {
      text: 'Grey',
      weights: EXTENDED_WEIGHTS,
    },
    'blue-grey': {
      text: 'Blue Grey',
      weights: EXTENDED_WEIGHTS,
    },
  };

  gradients = [
    'gradient-blue',
    'gradient-blue-green',
    'gradient-blue-red',
    'gradient-blue-purple',
    'gradient-red-orange',
    'gradient-orange-purple',
  ];

  shadows = Array.from({ length: 24 })
    .fill(undefined)
    .map((_, index) => index + 1);

  constructor() {}

  ngOnInit(): void {}
}
