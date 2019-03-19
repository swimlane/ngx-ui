import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { CalendarComponent } from './calendar.component';

import { MomentModule } from 'ngx-moment';
import { PipesModule } from '../../pipes/pipes.module';
import moment from 'moment-timezone';

(moment as any).suppressDeprecationWarnings = true;

const MOON_LANDING = '1969-07-20T20:17:43Z';
const MIN_DATE = new Date('2019-03-03T20:17:43Z');
const MAX_DATE = new Date('2019-03-28T20:17:43Z');

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
      component.writeValue('foo');
      expect(component.value).toBeTruthy();
      expect(component.weeks).toEqual([]);
    });
  });

  describe('min/max dates', () => {
    it('should disable', () => {
      component.minDate = MIN_DATE;
      component.maxDate = MAX_DATE;
      component.prevMonth();
      console.log(component)
    })
  })

});
