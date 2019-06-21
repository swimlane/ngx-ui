import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import moment from 'moment-timezone';

import { DateTimeComponent } from './date-time.component';

import { MomentModule } from 'ngx-moment';
import { DialogModule } from '../dialog/dialog.module';
import { PipesModule } from '../../pipes/pipes.module';

import { InjectionService } from '../../services/injection.service';

(moment as any).suppressDeprecationWarnings = true;

const MOON_LANDING = '1969-07-20T20:17:43Z';

const MOON_LANDING_DATE = new Date(MOON_LANDING);

const LOCAL_DATE = MOON_LANDING_DATE.toLocaleDateString('en-US', { day: '2-digit', year: 'numeric', month: '2-digit' });
const LOCAL_TIME = MOON_LANDING_DATE.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

const LOCAL_MONTH = MOON_LANDING_DATE.toLocaleDateString('en-US', { month: '2-digit' });
const LOCAL_DAY = MOON_LANDING_DATE.toLocaleDateString('en-US', { day: '2-digit' });
const LOCAL_YEAR = '' + MOON_LANDING_DATE.toLocaleDateString('en-US', { year: 'numeric' });

const LOCAL_HOUR = LOCAL_TIME.split(':')[0];
const LOCAL_MIN = MOON_LANDING_DATE.toLocaleTimeString('en-US', { minute: 'numeric' });
const LOCAL_AMPM = LOCAL_TIME.slice(-2);

describe('DateTimeComponent', () => {
  let component: DateTimeComponent;
  let fixture: ComponentFixture<DateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateTimeComponent],
      imports: [MomentModule, PipesModule, DialogModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [InjectionService]
    }).compileComponents();
  }));

  beforeEach(() => {
    const injectionService = TestBed.get(InjectionService);
    fixture = TestBed.createComponent(DateTimeComponent);
    injectionService.setRootViewContainer(fixture.componentRef);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.value).toBeFalsy();
    expect(typeof component.displayValue === 'string').toBeTruthy();
  });

  describe('date mode', () => {
    it('should write date value', () => {
      const date = new Date(MOON_LANDING);
      component.writeValue(date);

      expect(component.value).toBeTruthy();
      expect(component.value instanceof Date).toBeTruthy();
      expect(typeof component.displayValue === 'string').toBeTruthy();
      expect(component.displayValue).toEqual(LOCAL_DATE);
    });

    it('should write string value', () => {
      component.writeValue(MOON_LANDING);
      fixture.detectChanges();

      expect(component.value).toBeTruthy();
      expect(component.value instanceof Date).toBeTruthy();
      expect(typeof component.displayValue === 'string').toBeTruthy();
      expect(component.displayValue).toEqual(LOCAL_DATE);
    });

    it('should handle invalid date', () => {
      component.writeValue('moon landing');
      fixture.detectChanges();

      expect(component.value).toBeTruthy();
      expect(component.value instanceof Date).toBeFalsy();
      expect(typeof component.displayValue === 'string').toBeTruthy();
      expect(component.displayValue).toEqual('moon landing');
    });

    describe('precision', () => {
      it('should support year mode', () => {
        component.precision = 'year';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual(`01/01/${LOCAL_YEAR}`);
      });

      it('should support month mode', () => {
        component.precision = 'month';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual(`${LOCAL_MONTH}/01/${LOCAL_YEAR}`);
      });
    });

    describe('timezones', () => {
      it('should support utc', () => {
        component.timezone = 'utc';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual('07/20/1969');
      });

      it('should support Asia/Tokyo', () => {
        component.timezone = 'Asia/Tokyo';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual('07/21/1969');
      });
    });
  });

  describe('datetime [inputType]', () => {
    beforeEach(() => {
      component.inputType = 'datetime';
    });

    it('should write date value', () => {
      const date = new Date(MOON_LANDING);
      component.writeValue(date);

      expect(component.value).toBeTruthy();
      expect(component.value instanceof Date).toBeTruthy();
      expect(typeof component.displayValue === 'string').toBeTruthy();
      expect(component.displayValue).toEqual(`${LOCAL_DATE} ${LOCAL_TIME}`);
    });

    it('should write string value', () => {
      component.writeValue(MOON_LANDING);
      fixture.detectChanges();

      expect(component.value).toBeTruthy();
      expect(component.value instanceof Date).toBeTruthy();
      expect(typeof component.displayValue === 'string').toBeTruthy();
      expect(component.displayValue).toEqual(`${LOCAL_DATE} ${LOCAL_TIME}`);
    });

    describe('precision', () => {
      it('should support year mode', () => {
        component.precision = 'year';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual(`01/01/${LOCAL_YEAR} 12:00 AM`);
      });

      it('should support month mode', () => {
        component.precision = 'month';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual(`${LOCAL_MONTH}/01/${LOCAL_YEAR} 12:00 AM`);
      });

      it('should support hour mode', () => {
        component.precision = 'hour';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual(`${LOCAL_DATE} ${LOCAL_HOUR}:00 ${LOCAL_AMPM}`);
      });
    });

    describe('timezones', () => {
      it('should support utc', () => {
        component.timezone = 'utc';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual('07/20/1969 8:17 PM');
      });

      it('should support Asia/Tokyo', () => {
        component.timezone = 'Asia/Tokyo';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual('07/21/1969 5:17 AM');
      });
    });

    describe('formats', () => {
      it('should support datetime format', () => {
        component.format = 'MM DD, YYYY h:mm A';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual(`${LOCAL_MONTH} ${LOCAL_DAY}, ${LOCAL_YEAR} ${LOCAL_TIME}`);
      });

      it('should support utc iso format', () => {
        component.format = 'YYYY-MM-DDTHH:mm:ss[Z]';
        component.timezone = 'utc';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual('1969-07-20T20:17:43Z');
      });

      it('shold support timezone infor', () => {
        component.format = 'MMM DD, YYYY HH:mm:ss Z [(]z[)]';
        component.timezone = 'Asia/Tokyo';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual('Jul 21, 1969 05:17:43 +09:00 (JST)');
      });
    });
  });

  describe('time mode', () => {
    beforeEach(() => {
      component.inputType = 'time';
    });

    it('should write date value', () => {
      const date = new Date(MOON_LANDING);
      component.writeValue(date);

      expect(component.value).toBeTruthy();
      expect(component.value instanceof Date).toBeTruthy();
      expect(typeof component.displayValue === 'string').toBeTruthy();
      expect(component.displayValue).toEqual(LOCAL_TIME);
    });

    it('should write string value', () => {
      component.writeValue(MOON_LANDING);
      fixture.detectChanges();

      expect(component.value).toBeTruthy();
      expect(component.value instanceof Date).toBeTruthy();
      expect(typeof component.displayValue === 'string').toBeTruthy();
      expect(component.displayValue).toEqual(LOCAL_TIME);
    });

    describe('timezones', () => {
      it('should support utc', () => {
        component.timezone = 'utc';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual('8:17 PM');
      });

      it('should support timezone', () => {
        component.timezone = 'Asia/Tokyo';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual('5:17 AM');
      });
    });
  });

  describe('dialog', () => {
    beforeEach(() => {
      component.inputType = 'datetime';
      component.writeValue(MOON_LANDING);
      component.open();
    });

    afterEach(() => {
      component.close();
    });

    it('sets dialog value', () => {
      expect(component.dialogModel).toBeTruthy();
      expect(moment.isMoment(component.dialogModel)).toBeTruthy();
      expect(component.dialogModel.isSame(MOON_LANDING_DATE)).toBeTruthy();
      expect(component.hour).toBe(+LOCAL_HOUR);
      expect(component.minute).toBe(LOCAL_MIN);
      expect(component.amPmVal).toBe(LOCAL_AMPM);
      expect(component.isCurrent()).toBe(false);

      component.apply();
      expect(component.displayValue).toEqual(`${LOCAL_DATE} ${LOCAL_TIME}`);
    });

    it('should update minutes', () => {
      expect(component.dialogModel).toBeTruthy();
      expect(moment.isMoment(component.dialogModel)).toBeTruthy();

      component.minuteChanged(22);

      expect(component.hour).toBe(+LOCAL_HOUR);
      expect(component.minute).toBe('22');
      expect(component.amPmVal).toBe(LOCAL_AMPM);
      expect(component.isCurrent()).toBe(false);

      component.apply();
      expect(component.displayValue).toEqual(`${LOCAL_DATE} ${LOCAL_HOUR}:22 ${LOCAL_AMPM}`);
    });

    it('should update hours', () => {
      expect(component.dialogModel).toBeTruthy();
      expect(moment.isMoment(component.dialogModel)).toBeTruthy();

      component.hourChanged(11);

      expect(component.hour).toBe(11);
      expect(component.minute).toBe(LOCAL_MIN);
      expect(component.amPmVal).toBe(LOCAL_AMPM);
      expect(component.isCurrent()).toBe(false);

      component.apply();
      expect(component.displayValue).toEqual(`${LOCAL_DATE} 11:${LOCAL_MIN} ${LOCAL_AMPM}`);
    });

    it('should update am/pm', () => {
      expect(component.dialogModel).toBeTruthy();
      expect(moment.isMoment(component.dialogModel)).toBeTruthy();

      const newLocalAMPM = LOCAL_AMPM === 'PM' ? 'AM' : 'PM';

      component.onAmPmChange(newLocalAMPM);

      expect(component.hour).toBe(+LOCAL_HOUR);
      expect(component.minute).toBe(LOCAL_MIN);
      expect(component.amPmVal).toBe(newLocalAMPM);
      expect(component.isCurrent()).toBe(false);

      component.apply();
      expect(component.displayValue).toEqual(`${LOCAL_DATE} ${LOCAL_HOUR}:${LOCAL_MIN} ${newLocalAMPM}`);
    });

    it("should update hours, set 12 PM doesn't change day", () => {
      expect(component.dialogModel).toBeTruthy();
      expect(moment.isMoment(component.dialogModel)).toBeTruthy();

      component.hourChanged(12);

      expect(component.hour).toBe(12);
      expect(component.minute).toBe(LOCAL_MIN);
      expect(component.amPmVal).toBe(LOCAL_AMPM);
      expect(component.isCurrent()).toBe(false);

      component.apply();
      expect(component.displayValue).toEqual(`${LOCAL_DATE} 12:${LOCAL_MIN} ${LOCAL_AMPM}`);
    });

    it("should update hours, set 12 AM doesn't change AM/PM", () => {
      expect(component.dialogModel).toBeTruthy();
      expect(moment.isMoment(component.dialogModel)).toBeTruthy();

      expect(component.amPmVal).toBe(LOCAL_AMPM);

      component.onAmPmChange('AM');
      component.hourChanged(12);

      expect(component.hour).toBe(12);
      expect(component.minute).toBe(LOCAL_MIN);
      expect(component.amPmVal).toBe('AM');
      expect(component.isCurrent()).toBe(false);

      component.apply();
      expect(component.displayValue).toEqual(`${LOCAL_DATE} 12:${LOCAL_MIN} AM`);
    });

    it('should setDialogDate', () => {
      expect(component.dialogModel).toBeTruthy();
      expect(moment.isMoment(component.dialogModel)).toBeTruthy();

      component.setDialogDate(new Date('1/1/1990 12:39 PM'));

      expect(component.hour).toBe(12);
      expect(component.minute).toBe('39');
      expect(component.amPmVal).toBe('PM');
      expect(component.isCurrent()).toBe(false);

      component.apply();
      expect(component.displayValue).toEqual(`01/01/1990 12:39 PM`);
    });

    it('should set current', () => {
      expect(component.dialogModel).toBeTruthy();
      expect(moment.isMoment(component.dialogModel)).toBeTruthy();

      component.selectCurrent();
      expect(component.isCurrent()).toBe(true);
    });

    it('should clear', () => {
      expect(component.dialogModel).toBeTruthy();
      expect(moment.isMoment(component.dialogModel)).toBeTruthy();

      component.clear();
      expect(component.displayValue).toEqual('');
    });
  });
});
