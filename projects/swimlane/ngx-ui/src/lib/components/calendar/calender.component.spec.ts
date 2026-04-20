import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MomentModule } from 'ngx-moment';
import moment from 'moment-timezone';

import { PipesModule } from '../../pipes/pipes.module';
import { CalendarView } from './calendar-view.enum';
import { CalendarSelect } from './calendar-select.enum';
import { CalendarComponent } from './calendar.component';
import { CalendarDay } from './calendar-day.interface';

(moment as any).suppressDeprecationWarnings = true;

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [MomentModule, PipesModule],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('changeViews', () => {
    it('should change view to month if date', () => {
      component.currentView = CalendarView.Date;
      component.changeViews();
      expect(component.currentView).toBe(CalendarView.Month);
    });

    it('should change view to year if month', () => {
      component.currentView = CalendarView.Month;
      component.changeViews();
      expect(component.currentView).toBe(CalendarView.Year);
    });

    it('should change view to min if year', () => {
      component.currentView = CalendarView.Year;
      component.changeViews();
      expect(component.currentView).toBe(component.minView);
    });
  });

  describe('validateView', () => {
    it('should set minView as date if minView is not date, month, or year', () => {
      component.minView = 'test' as any;
      component.validateView();
      expect(component.minView).toBe(CalendarView.Date);
    });

    it('should set defaultView to minView if defaultView is smaller than than minView', () => {
      component.minView = CalendarView.Month;
      component.defaultView = CalendarView.Date;
      component.validateView();
      expect(component.defaultView).toBe(component.minView);
    });
  });

  describe('isDayActive', () => {
    it('should return true if date matches day value', () => {
      component.value = new Date();
      expect(component.isDayActive(moment())).toBe(true);
    });

    it('should return false if date does not match day value', () => {
      const now = new Date();
      now.setFullYear(now.getFullYear() - 1);
      component.value = now;
      expect(component.isDayActive(moment())).toBe(false);
    });
  });

  describe('isMonthActive', () => {
    it('should return true if same month of year', () => {
      component.value = new Date();
      expect(component.isMonthActive(moment().format('MMMM'))).toBe(true);
    });

    it('should return false if not same month of year', () => {
      const now = new Date();
      now.setDate(1);
      now.setMonth(now.getMonth() - 1);
      component.value = now;
      expect(component.isMonthActive(moment().format('MMMM'))).toBe(false);
    });
  });

  describe('isCurrentMonth', () => {
    it('should return true if month is same as current', () => {
      component.value = new Date();
      component.ngOnInit();
      expect(component.isCurrentMonth(moment().format('MMMM'))).toBe(true);
    });

    it('should return false if month is not same as current', () => {
      const now = new Date();
      now.setDate(1);
      now.setMonth(now.getMonth() - 1);
      component.value = now;
      component.ngOnInit();
      expect(component.isCurrentMonth(moment().format('MMMM'))).toBe(false);
    });
  });

  describe('isYearActive', () => {
    it('should return true if year is same as value', () => {
      component.value = new Date();
      expect(component.isYearActive(new Date().getFullYear())).toBe(true);
    });

    it('should return false if year is not same as value', () => {
      const now = new Date();
      now.setFullYear(now.getFullYear() - 1);
      component.value = now;
      expect(component.isYearActive(new Date().getFullYear())).toBe(false);
    });
  });

  describe('isCurrentYear', () => {
    it('should return true if year is same as current', () => {
      component.value = new Date();
      component.ngOnInit();
      expect(component.isCurrentYear(new Date().getFullYear())).toBe(true);
    });

    it('should return false if year is not same as current', () => {
      const now = new Date();
      now.setFullYear(now.getFullYear() - 1);
      component.value = now;
      component.ngOnInit();
      expect(component.isCurrentYear(new Date().getFullYear())).toBe(false);
    });
  });

  describe('isDisabled', () => {
    it('should return true if disabled', () => {
      component.disabled = true;
      expect(component.isDisabled(undefined, undefined)).toBe(true);
    });

    it('should return false if value undefined', () => {
      expect(component.isDisabled(undefined, undefined)).toBe(false);
    });

    it('should return true if date is before min', () => {
      component.minDate = new Date();
      component.minDate.setMonth(2);
      expect(component.isDisabled('January', 'month')).toBe(true);
    });

    it('should return true if date is after max', () => {
      const date = moment().add(1, 'years');
      component.maxDate = new Date();
      expect(component.isDisabled(date.format('YYYY'), 'year')).toBe(true);
    });

    it('should return false if invalid type', () => {
      expect(component.isDisabled(moment().format('YYYY'), 'test')).toBe(false);
    });
  });

  describe('onDayClick', () => {
    beforeEach(() => {
      component.weeks = [];
    });

    it('should set value and set weeks of month', () => {
      component.onDayClick({
        date: moment(),
        nextMonth: true,
        prevMonth: true
      } as any);
      expect(component.weeks.length).toBeGreaterThan(0);
    });

    it('should set value but not set weeks of month', () => {
      component.onDayClick({
        date: moment()
      } as any);
      expect(component.weeks.length).toBe(0);
    });
  });

  describe('onMonthClick', () => {
    beforeEach(() => {
      component.weeks = [];
    });

    it('should set value and set weeks of month', () => {
      component.minView = CalendarView.Year;
      component.onMonthClick(moment().format('MMMM'));
      expect(component.weeks.length).toBeGreaterThan(0);
    });

    it('should set value but not set weeks of month', () => {
      component.minView = CalendarView.Month;
      component.onMonthClick(moment().format('MMMM'));
      expect(component.weeks.length).toBe(0);
    });
  });

  describe('onYearClick', () => {
    beforeEach(() => {
      component.weeks = [];
    });

    it('should set value and set weeks of month', () => {
      component.minView = CalendarView.Month;
      component.onYearClick(new Date().getFullYear());
      expect(component.weeks.length).toBeGreaterThan(0);
    });

    it('should set value but not set weeks of month', () => {
      component.minView = CalendarView.Year;
      component.onYearClick(new Date().getFullYear());
      expect(component.weeks.length).toBe(0);
    });
  });

  describe('pagination', () => {
    beforeEach(() => {
      component.focusDate = moment('5/1/1975');
      component.startYear = new Date().getFullYear();
      component.weeks = [];
    });

    describe('month', () => {
      describe('prevMonth', () => {
        it('should set value to previous month', () => {
          const month = component.focusDate.get('month');
          component.prevMonth();
          expect(component.focusDate.get('month')).toBe(month - 1);
          expect(component.weeks.length).toBeGreaterThan(0);
        });
      });

      describe('nextMonth', () => {
        it('should set value to next month', () => {
          const month = component.focusDate.get('month');
          component.nextMonth();
          expect(component.focusDate.get('month')).toBe(month < 11 ? month + 1 : 0);
          expect(component.weeks.length).toBeGreaterThan(0);
        });
      });
    });

    describe('year', () => {
      describe('prevYear', () => {
        it('should set value to previous year', () => {
          const year = component.focusDate.get('year');
          component.prevYear();
          expect(component.focusDate.get('year')).toBe(year - 1);
        });
      });

      describe('nextYear', () => {
        it('should set value to next year', () => {
          const year = component.focusDate.get('year');
          component.nextYear();
          expect(component.focusDate.get('year')).toBe(year + 1);
        });
      });
    });

    describe('twoDecades', () => {
      describe('prevTwoDecades', () => {
        it('should set startYear to two decades ago', () => {
          const startYear = component.startYear;
          component.prevTwoDecades();
          expect(component.startYear).toBe(startYear - 20);
        });
      });

      describe('nextTwoDecades', () => {
        it('should set startYear to two decades in the future', () => {
          const startYear = component.startYear;
          component.nextTwoDecades();
          expect(component.startYear).toBe(startYear + 20);
        });
      });
    });
  });

  describe('writeValue', () => {
    it('should write to value if valid and different', () => {
      const now = new Date();
      const newDate = new Date();
      now.setDate(now.getDate() - 1);
      component.value = now;
      component.writeValue(newDate);
      expect(component.focusDate.isSame(newDate)).toBe(true);
    });

    it('should not write new value if invalid', () => {
      const date = 'test';
      component.value = new Date();
      component.writeValue(date);
      expect(component.focusDate.isSame(date)).toBe(false);
    });
  });

  describe('registerOnChange', () => {
    it('should register new on change callback fn', done => {
      component.value = new Date();
      component.registerOnChange((v: Date) => {
        expect(v).toEqual(now);
        done();
      });

      const now = new Date();
      now.setDate(now.getDate() + 1);
      component.value = now;
    });
  });

  describe('Time Functions', () => {
    it('should update hour correctly', () => {
      component.range = { startDate: new Date(), endDate: undefined };
      component.startAmPmVal = 'PM';
      component.startHour = '5';
      component.hourChanged('03', 'start');
      expect(component.range?.startDate?.getHours()).toBe(3);
    });

    it('should update minute correctly', () => {
      component.range = { startDate: new Date(), endDate: undefined };
      component.startMinute = '30';
      component.minuteChanged('45', 'start');
      expect(component.range?.startDate?.getMinutes()).toBe(45);
    });

    it('should update AM/PM correctly', () => {
      component.range = { startDate: new Date(), endDate: undefined };
      component.startAmPmVal = 'AM';
      component.range?.startDate?.setHours(2);
      component.onAmPmChange('PM', 'start');
      expect(component.range?.startDate?.getHours()).toBe(14);
    });
  });

  describe('conditional time Input rendering', () => {
    it('should show both time inputs if both showStartTimeInputs and showEndTimeInputs are true', () => {
      fixture = TestBed.createComponent(CalendarComponent);
      component = fixture.componentInstance;
      component.range = { startDate: new Date(), endDate: new Date() };
      component.showStartTimeInputs = true;
      component.showEndTimeInputs = true;
      component.selectType = CalendarSelect.Range;
      fixture.detectChanges();
      const timeRows = fixture.nativeElement.querySelectorAll('.time-row');
      expect(timeRows.length).toBe(2);
    });

    it('should hide start time input if showStartTimeInputs is false', () => {
      fixture = TestBed.createComponent(CalendarComponent);
      component = fixture.componentInstance;
      component.range = { startDate: new Date(), endDate: new Date() };
      component.showStartTimeInputs = false;
      component.showEndTimeInputs = true;
      component.selectType = CalendarSelect.Range;
      fixture.detectChanges();
      const timeRows = fixture.nativeElement.querySelectorAll('.time-row');
      expect(timeRows.length).toBe(1); // only end input shown
    });

    it('should hide end time input if showEndTimeInputs is false', () => {
      fixture = TestBed.createComponent(CalendarComponent);
      component = fixture.componentInstance;
      component.range = { startDate: new Date(), endDate: new Date() };
      component.showStartTimeInputs = true;
      component.showEndTimeInputs = false;
      component.selectType = CalendarSelect.Range;
      fixture.detectChanges();
      const timeRows = fixture.nativeElement.querySelectorAll('.time-row');
      expect(timeRows.length).toBe(1); // only start input shown
    });

    it('should hide both time inputs if both flags are false', () => {
      fixture = TestBed.createComponent(CalendarComponent);
      component = fixture.componentInstance;
      component.showStartTimeInputs = false;
      component.showEndTimeInputs = false;
      component.range = {
        startDate: new Date('2024-06-01T10:00:00'),
        endDate: new Date('2024-06-02T18:00:00')
      };
      component.selectType = CalendarSelect.Range;
      fixture.detectChanges();
      const timeRows = fixture.nativeElement.querySelectorAll('.time-row');
      expect(timeRows.length).toBe(0); // nothing rendered
    });
  });

  describe('initializeTime', () => {
    it('should initialize time properties based on range start and range end', () => {
      const rangeStart = new Date('2024-04-04T10:30:00');
      const rangeEnd = new Date('2024-04-04T15:45:00');

      component.range = { startDate: rangeStart, endDate: rangeEnd };
      component.initializeTime();

      expect(component.startHour).toBe('10');
      expect(component.startMinute).toBe('30');
      expect(component.startAmPmVal).toBe('AM');

      expect(component.endHour).toBe('03');
      expect(component.endMinute).toBe('45');
      expect(component.endAmPmVal).toBe('PM');
    });

    it('should initialize time properties with default values if range start and rangeEnd are not provided', () => {
      component.initializeTime();

      expect(component.startHour).toBe('12');
      expect(component.endHour).toBe('12');
      expect(component.startMinute).toBe('00');
      expect(component.endMinute).toBe('00');
      expect(component.startAmPmVal).toBe('AM');
      expect(component.endAmPmVal).toBe('AM');
    });
  });

  describe('onDaySelectRange', () => {
    it('should set range start if both range start and range end are undefined', () => {
      const day = { date: moment('2024-04-04'), nextMonth: true, prevMonth: true } as CalendarDay;
      component.focusDate = moment('2024-04-04');
      component.range = { startDate: undefined, endDate: undefined };
      component.startHour = '10';
      component.startMinute = '30';

      component.onDaySelectRange(day);

      expect(component.range?.startDate).toEqual(new Date('2024-04-04T10:30:00'));
      expect(component.range?.endDate).toBeUndefined();
    });

    it('should set range end if range start is set and focusDate is greater than range start', () => {
      const day = { date: moment('2024-04-10'), nextMonth: true, prevMonth: true } as CalendarDay;
      component.focusDate = moment('2024-04-10');
      component.range = { startDate: new Date('2024-04-04T10:30:00'), endDate: undefined };
      component.endHour = '15';
      component.endMinute = '45';

      component.onDaySelectRange(day);

      expect(component.range?.startDate).toEqual(new Date('2024-04-04T10:30:00'));
      expect(component.range?.endDate).toEqual(new Date('2024-04-10T15:45:00'));
    });

    it('should set range end if range start is set and focusDate is same as range start', () => {
      const day = { date: moment('2024-04-10'), nextMonth: true, prevMonth: true } as CalendarDay;
      component.focusDate = moment('2024-04-10');
      component.range = { startDate: new Date('2024-04-10T10:30:00'), endDate: undefined };
      component.endHour = '15';
      component.endMinute = '45';

      component.onDaySelectRange(day);

      expect(component.range?.startDate).toEqual(new Date('2024-04-10T10:30:00'));
      expect(component.range?.endDate).toEqual(new Date('2024-04-10T15:45:00'));
    });

    it('should update range start if range start is set and focusDate is less than or equal to range start', () => {
      const day = { date: moment('2024-04-01'), nextMonth: true, prevMonth: true } as CalendarDay;
      component.focusDate = moment('2024-04-01');
      component.range = { startDate: new Date('2024-04-04T10:30:00'), endDate: undefined };
      component.startHour = '8';
      component.startMinute = '15';

      component.onDaySelectRange(day);

      expect(component.range?.startDate).toEqual(new Date('2024-04-01T08:15:00'));
      expect(component.range?.endDate).toBeUndefined();
    });

    it('should reset range start and range end if both are already set', () => {
      const day = { date: moment('2024-04-04'), nextMonth: true, prevMonth: true } as CalendarDay;
      component.focusDate = moment('2024-04-04');
      component.range = { startDate: new Date('2024-04-01T08:15:00'), endDate: new Date('2024-04-10T15:45:00') };
      component.startHour = '12';
      component.startMinute = '0';

      component.onDaySelectRange(day);

      expect(component.range?.startDate).toEqual(new Date('2024-04-04T12:00:00'));
      expect(component.range?.endDate).toBeUndefined();
    });
  });
});
