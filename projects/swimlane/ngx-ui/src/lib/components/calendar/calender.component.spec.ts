import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CalendarComponent } from './calendar.component';

import { MomentModule } from 'ngx-moment';
import { PipesModule } from '../../pipes/pipes.module';
import moment from 'moment-timezone';

(moment as any).suppressDeprecationWarnings = true;

const MOON_LANDING = '1969-07-20T20:17:43Z';
const MIN_DATE = new Date('2019-03-01T20:17:43Z');
const MAX_DATE = new Date('2019-03-31T20:17:43Z');

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MomentModule, PipesModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.value).toBeFalsy();
    expect(component.minView).toBe('date');
    expect(component.defaultView).toBe('date');
    expect(component.activeDate).toBe(component.current);
  });

  describe('view validation', () => {
    it('should show default view as current view', () => {
      component.defaultView = 'month';
      expect(component.minView).toBe('date');
      expect(component.currentView).toBe('month');
    });

    it('should validate default view', () => {
      component.minView = 'year';
      component.defaultView = 'date';
      expect(component.defaultView).toBe('year');
    });

    it('should validate current view', () => {
      component.minView = 'month';
      component.currentView = 'year';
      component.changeViews();
      expect(component.currentView).toBe('month');
      component.onMonthClick('jan');
      expect(component.currentView).toBe('month');
      component.minView = 'date';
      component.onMonthClick('jan');
      expect(component.currentView).toBe('date');
      component.minView = 'year';
      expect(component.currentView).toBe('year');
    });
  });

  describe('date', () => {
    it('should write string value', () => {
      component.writeValue(MOON_LANDING);
      expect(component.value).toBeTruthy();
      expect(typeof component.value).toBe('string');
      expect(component.activeDate instanceof moment).toBeTruthy();
    });

    it('should write Date value', () => {
      component.writeValue(new Date(MOON_LANDING));
      expect(component.value).toBeTruthy();
      expect(component.value instanceof Date).toBeTruthy();
      expect(component.activeDate instanceof moment).toBeTruthy();
    });

    it('should handle invalid date', () => {
      // FIX ME once invalid date changes on the component merge
      component.writeValue('foo');
      expect(component.activeDate).toBeTruthy();
      expect(component.activeDate.format()).toEqual(moment(new Date()).format());
      component.writeValue(MOON_LANDING);
      component.writeValue('foo');
      fixture.detectChanges();
      expect(component.activeDate).toEqual(moment(MOON_LANDING));
    });
  });

  describe('min/max dates', () => {
    it('should disable', () => {
      component.minDate = MIN_DATE;
      component.maxDate = MAX_DATE;
      component.writeValue(MAX_DATE);
      expect(component.minDate).toBeTruthy();
      expect(component.maxDate).toBeTruthy();
      component.prevMonth();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.day.first-day-of-month').disabled).toBe(true);
      component.nextMonth();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.day.first-day-of-month').disabled).toBe(false);
    });

    it('should write date not in range', () => {
      component.minDate = MIN_DATE;
      component.maxDate = MAX_DATE;
      component.writeValue(MOON_LANDING);
      expect(component.minDate).toBeTruthy();
      expect(component.maxDate).toBeTruthy();
      expect(component.activeDate).toEqual(moment(MOON_LANDING));
    });
  });

  describe('timezones', () => {
    it('should support utc', () => {
      component.timezone = 'utc';
      component.writeValue(MOON_LANDING);
      fixture.detectChanges();
      expect(component.activeDate.format('MMMM Do YYYY, h:mm a')).toEqual('July 20th 1969, 8:17 pm');
    });

    it('should support Asia/Tokyo', () => {
      component.timezone = 'Asia/Tokyo';
      component.writeValue(MOON_LANDING);
      fixture.detectChanges();
      expect(component.activeDate.format('MMMM Do YYYY, h:mm a')).toEqual('July 21st 1969, 5:17 am');
    });
  });

  describe('DOM', () => {
    function getDayOfMonth(date: Date) {
      return date.getDate() + '';
    }
    function getMonth(date: Date) {
      return date.toLocaleString('en-us', { month: 'short' });
    }
    function getYear(date: Date) {
      return date.toLocaleString('en-us', { year: 'numeric' });
    }

    it('should mark today', () => {
      expect(fixture.nativeElement.querySelector('.day.today').innerHTML.trim()).toEqual(getDayOfMonth(new Date()));
    });

    it('should highlight selected date', () => {
      component.writeValue(MOON_LANDING);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.day.active').innerHTML.trim()).toEqual(
        getDayOfMonth(new Date(MOON_LANDING))
      );
      component.writeValue(new Date());
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.day.active').innerHTML.trim()).toEqual(getDayOfMonth(new Date()));
    });

    it('should mark current month', () => {
      component.currentView = 'month';
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.month.current').innerHTML.trim()).toEqual(getMonth(new Date()));
    });

    it('should highlight selected month', () => {
      component.writeValue(MOON_LANDING);
      component.currentView = 'month';
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.month.active').innerHTML.trim()).toEqual(
        getMonth(new Date(MOON_LANDING))
      );
      expect(fixture.nativeElement.querySelector('.month.current')).toBeNull();
    });

    it('should mark current year', () => {
      component.currentView = 'year';
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.year.current').innerHTML.trim()).toEqual(getYear(new Date()));
    });

    it('should highlight selected year', () => {
      component.writeValue(MOON_LANDING);
      component.currentView = 'year';
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.year.active').innerHTML.trim()).toEqual(
        getYear(new Date(MOON_LANDING))
      );
    });
  });
});
