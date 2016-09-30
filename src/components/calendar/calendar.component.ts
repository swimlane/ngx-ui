import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { getDaysForMonth } from './calendar-utils';

@Component({
  selector: 'swui-calendar',
  template: `
    <div class="swui-calendar">
      <div class="title-row u-flex">
        <button
          type="button"
          class="prev-month u-sizeFit"
          (click)="prevMonth()">
          <span class="icon-arrow-left"></span>
        </button>
        <span class="current-date u-sizeFill u-textCenter">
          {{ date.format('MMMM YYYY') }}
        </span>
        <button
          type="button"
          class="next-month u-sizeFit"
          (click)="nextMonth()">
          <span class="icon-arrow-right"></span>
        </button>
      </div>
      <table>
        <thead>
          <tr class="day-name-row">
            <td *ngFor="let d of daysOfWeek">
              {{d}}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr
            class="week-row"
            *ngFor="let week of weeks; let wkNum = index">
            <td
              *ngFor="let day of week"
              [ngClass]="getDayClass(day, wkNum)">
              <button
                type="button"
                (click)="onDayClick($event, day, week)">
                {{day}}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class CalendarComponent {

  @Input() date = moment();
  @Input() daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  private weeks: number[];

  ngOnInit() {
    this.weeks = getDaysForMonth(this.date);
  }

  ngOnChanges(changes) {
    if (changes.hasOwnProperty('date')) {
      this.weeks = getDaysForMonth(this.date);
    }
  }

  getDayClass(dayNum: number, weekNum: number) {
    const prevMonth = (weekNum === 0 && dayNum > 7);
    const nextMonth = (weekNum >= 4 && dayNum <= 14);
    const currentDay = !prevMonth && !nextMonth && (dayNum === this.date.date());

    return {
      'prev-month': prevMonth,
      'next-month': nextMonth,
      'current-day': currentDay
    };
  }

  onDayClick(event, day, week) {
    
  }

  prevMonth() {
    this.date.subtract(1, 'month');
    this.weeks = getDaysForMonth(this.date);
  }

  nextMonth() {
    this.date.add(1, 'month');
    this.weeks = getDaysForMonth(this.date);
  }

}
