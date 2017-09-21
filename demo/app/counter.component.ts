import { Component, Input, OnInit } from '@angular/core';

const counts = {};

/** Counts teh number of times a counter with the given id is initialized. */
@Component({
  selector: 'counter',
  template: `
  <h2>
    ngOnInit ran 
    {{this.count}}
    <span [ngPlural]="this.count">
      <ng-template ngPluralCase="=1">time</ng-template>
      <ng-template ngPluralCase="other">times</ng-template>
    </span>
  </h2>`
})
export class CounterComponent implements OnInit {
  @Input()
  id: string;

  count: number;

  ngOnInit() {
    this.count = counts[this.id] || 0;
    console.log(this.id, 'counter instances: ', this.count++);
    counts[this.id] = this.count;
  }
}
