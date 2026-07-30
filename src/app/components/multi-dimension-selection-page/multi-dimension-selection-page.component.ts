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

  disabledSelectionListExampleValue: Array<SelectionListOption> = [];

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
