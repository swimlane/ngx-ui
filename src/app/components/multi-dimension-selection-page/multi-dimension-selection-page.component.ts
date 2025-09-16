import { Component, OnInit } from '@angular/core';
import { SelectionList, SelectionListOption } from '@swimlane/ngx-ui';
import { exampleSelectionList, exampleSelectionListValue } from './examples/mock-selection-lists';

@Component({
  selector: 'app-multi-dimension-selection-page',
  templateUrl: './multi-dimension-selection-page.component.html',
  standalone: false
})
export class MultiDimensionSelectionPageComponent implements OnInit {
  selectionListExample = exampleSelectionList;

  selectionListExampleValue = exampleSelectionListValue;

  disabledSelectionListExampleValue: SelectionListOption[] = [
    {
      name: 'Option 2',
      value: 'option2'
    },
    {
      name: 'Option 2B',
      value: 'option2b'
    },
    {
      name: 'Option 6',
      value: 'option6'
    },
    {
      name: 'Option 6A',
      value: 'option6a'
    },
    {
      name: 'Option 6E',
      value: 'option6e'
    },
    {
      name: 'Option 6E-1',
      value: 'option6e1'
    },
    {
      name: 'Option 6E-4 With a Very Long Title',
      value: 'option6e4'
    },
    {
      name: 'Option 6E-7',
      value: 'option6e7'
    }
  ];

  singleSelectionListExampleValue: SelectionListOption[] = [
    {
      name: 'Option 6E-3',
      value: 'option6e3'
    }
  ];

  disabledSelectionListExample: SelectionList = structuredClone(exampleSelectionList);

  ngOnInit(): void {
    this.disabledSelectionListExample.children[0].disabled = true;
    this.disabledSelectionListExample.children[2].disabled = true;
    this.disabledSelectionListExample.children[4].disabled = true;
    this.disabledSelectionListExample.children[6].disabled = true;
  }

  onFilterChange(selected: Array<SelectionListOption>) {
    console.log('Filter selected options: ', selected);
  }

  onSelectedChange(selected: Array<SelectionListOption>) {
    console.log('Selected options: ', selected);
  }

  onSingleSelectFilterChange(selected: Array<SelectionListOption>) {
    console.log('Single select option: ', selected);
  }

  scrollTo(id: string) {
    (document.getElementById(id) as HTMLElement)?.scrollIntoView({ behavior: 'smooth' });
  }
}
