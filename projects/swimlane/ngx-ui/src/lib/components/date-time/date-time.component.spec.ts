import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import moment from 'moment-timezone';
import { MomentModule } from 'ngx-moment';
import { DATE_DISPLAY_TYPES } from '../../enums/date-formats.enum';
import { PipesModule } from '../../pipes/pipes.module';
import { InjectionService } from '../../services/injection/injection.service';
import { DialogModule } from '../dialog/dialog.module';

import { DateTimeComponent } from './date-time.component';

(moment as any).suppressDeprecationWarnings = true;

// const TOHOKU_EARTHQUAKE = '2011-03-11T05:46:24Z';

const MOON_LANDING = '1969-07-20T20:17:43Z';

const MOON_LANDING_DATE = new Date(MOON_LANDING);

const LOCAL_DATE = MOON_LANDING_DATE.toLocaleDateString('en-US', { day: '2-digit', year: 'numeric', month: '2-digit' });
const LOCAL_TIME = MOON_LANDING_DATE.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

const LOCAL_MONTH = MOON_LANDING_DATE.toLocaleDateString('en-US', { month: '2-digit' });
const LOCAL_DAY = MOON_LANDING_DATE.toLocaleDateString('en-US', { day: '2-digit' });
const LOCAL_YEAR = '' + MOON_LANDING_DATE.toLocaleDateString('en-US', { year: 'numeric' });

const LOCAL_HOUR = LOCAL_TIME.split(':')[0];
const LOCAL_MIN = MOON_LANDING_DATE.toLocaleTimeString('en-US', { minute: 'numeric' });
const LOCAL_SEC = MOON_LANDING_DATE.toLocaleTimeString('en-US', { second: 'numeric' });
const LOCAL_AM_PM = LOCAL_TIME.slice(-2);

describe('DateTimeComponent', () => {
  let component: DateTimeComponent;
  let fixture: ComponentFixture<DateTimeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DateTimeComponent],
      imports: [MomentModule, PipesModule, DialogModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [InjectionService]
    }).compileComponents();
  }));

  beforeEach(() => {
    const injectionService = TestBed.inject(InjectionService);
    fixture = TestBed.createComponent(DateTimeComponent);
    injectionService.setRootViewContainer(fixture.componentRef as any);

    component = fixture.componentInstance;
    component.disabled = false;
    component.tabindex = 0;
    component.autofocus = false;
    component.minDate = undefined;
    component.maxDate = undefined;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.value).toBeFalsy();
    expect(typeof component.displayValue === 'string').toBeTruthy();
  });

  describe('defaults', () => {
    it('should have reasonable defaults', () => {
      expect(component.appearance).toEqual('legacy');
      expect(component.inputType).toEqual('date');
      expect(component.displayMode).toEqual('local');
      expect(component.format).toEqual('L');
      expect(component.clipFormat).toEqual('L');
    });

    it('should have reasonable defaults when timezone is provided', () => {
      component.timezone = 'America/Los_Angeles';
      fixture.detectChanges();

      expect(component.appearance).toEqual('legacy');
      expect(component.inputType).toEqual('date');
      expect(component.displayMode).toEqual('timezone');
      expect(component.format).toEqual('L Z');
      expect(component.clipFormat).toEqual('L Z');
    });

    it('should have reasonable defaults when mode is timezone', () => {
      component.displayMode = DATE_DISPLAY_TYPES.TIMEZONE;
      fixture.detectChanges();

      expect(component.appearance).toEqual('legacy');
      expect(component.inputType).toEqual('date');
      expect(component.displayMode).toEqual('timezone');
      expect(component.format).toEqual('L Z');
      expect(component.clipFormat).toEqual('L Z');
    });

    it('should have reasonable defaults when mode is custom', () => {
      component.displayMode = DATE_DISPLAY_TYPES.CUSTOM;
      fixture.detectChanges();

      expect(component.appearance).toEqual('legacy');
      expect(component.inputType).toEqual('date');
      expect(component.displayMode).toEqual('custom');
      expect(component.format).toEqual('ll');
      expect(component.clipFormat).toEqual('ll');
    });

    it('should have reasonable defaults when precision is month', () => {
      component.precision = 'month';
      fixture.detectChanges();

      expect(component.appearance).toEqual('legacy');
      expect(component.inputType).toEqual('date');
      expect(component.displayMode).toEqual('local');
      expect(component.format).toEqual('MMM YYYY');
      expect(component.clipFormat).toEqual('MMM YYYY');
    });

    it('should have reasonable defaults when precision is year', () => {
      component.precision = 'year';
      fixture.detectChanges();

      expect(component.appearance).toEqual('legacy');
      expect(component.inputType).toEqual('date');
      expect(component.displayMode).toEqual('local');
      expect(component.format).toEqual('YYYY');
      expect(component.clipFormat).toEqual('YYYY');
    });

    it('should have reasonable defaults when precision is hour', () => {
      component.precision = 'hour';
      fixture.detectChanges();

      expect(component.appearance).toEqual('legacy');
      expect(component.inputType).toEqual('datetime');
      expect(component.displayMode).toEqual('local');
      expect(component.format).toEqual('L LT');
      expect(component.clipFormat).toEqual('L LT');
    });
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
        expect(component.displayValue).toEqual(LOCAL_YEAR);
      });

      it('should support month mode', () => {
        component.precision = 'month';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual(`Jul 1969`);
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
        expect(component.displayValue).toEqual('07/20/1969 +00:00');
      });

      it('should support Asia/Tokyo', () => {
        component.timezone = 'Asia/Tokyo';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual('07/21/1969 +09:00');
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
        expect(component.displayValue).toEqual(`${LOCAL_DATE} ${LOCAL_HOUR}:00 ${LOCAL_AM_PM}`);
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
        expect(component.displayValue).toEqual('07/20/1969 8:17 PM +00:00');
      });

      it('should support Asia/Tokyo', () => {
        component.timezone = 'Asia/Tokyo';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual('07/21/1969 5:17 AM +09:00');
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

      it('should support timezone info', () => {
        component.format = 'MMM DD, YYYY HH:mm:ss Z [(]z[)]';
        component.timezone = 'Asia/Tokyo';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual('Jul 21, 1969 05:17:43 +09:00 (JST)');
      });

      it('should support seconds & milliseconds', () => {
        component.format = 'MMM DD, YYYY HH:mm:ss:SSS';
        component.timezone = 'Asia/Tokyo';

        const isoDateString = '2023-10-27T05:57:12.890Z';
        component.writeValue(new Date(isoDateString));
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual('Oct 27, 2023 14:57:12:890');
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
        expect(component.displayValue).toEqual('8:17 PM +00:00');
      });

      it('should support timezone', () => {
        component.timezone = 'Asia/Tokyo';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();

        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual('5:17 AM +09:00');
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

    it('should open with now date if value invalid', () => {
      const spy = spyOn(component, 'setDialogDate').and.callThrough();
      component.close();
      component.value = 'test';
      component.open();
      expect(spy).toHaveBeenCalled();
    });

    it('sets dialog value', () => {
      expect(component.dialogModel).toBeTruthy();
      expect(moment.isMoment(component.dialogModel)).toBeTruthy();
      expect(component.dialogModel.isSame(MOON_LANDING_DATE)).toBeTruthy();
      expect(component.hour).toBe(+LOCAL_HOUR);
      expect(component.minute).toBe(LOCAL_MIN);
      expect(component.second).toBe(LOCAL_SEC);
      expect(component.amPmVal).toBe(LOCAL_AM_PM);
      expect(component.isCurrent()).toBe(false);

      component.apply();
      expect(component.displayValue).toEqual(`${LOCAL_DATE} ${LOCAL_TIME}`);
    });

    it('should get input type time', () => {
      component.inputType = 'time';
      component.dialogModel = moment(new Date());
      expect(component.isCurrent()).toBeTruthy();
    });

    it('should update minutes', () => {
      expect(component.dialogModel).toBeTruthy();
      expect(moment.isMoment(component.dialogModel)).toBeTruthy();

      component.minuteChanged(22);

      expect(component.hour).toBe(+LOCAL_HOUR);
      expect(component.minute).toBe('22');
      expect(component.amPmVal).toBe(LOCAL_AM_PM);
      expect(component.isCurrent()).toBe(false);

      component.apply();
      expect(component.displayValue).toEqual(`${LOCAL_DATE} ${LOCAL_HOUR}:22 ${LOCAL_AM_PM}`);
    });

    it('should update hours', () => {
      expect(component.dialogModel).toBeTruthy();
      expect(moment.isMoment(component.dialogModel)).toBeTruthy();

      component.hourChanged(11);

      expect(component.hour).toBe(11);
      expect(component.minute).toBe(LOCAL_MIN);
      expect(component.amPmVal).toBe(LOCAL_AM_PM);
      expect(component.isCurrent()).toBe(false);

      component.apply();
      expect(component.displayValue).toEqual(`${LOCAL_DATE} 11:${LOCAL_MIN} ${LOCAL_AM_PM}`);
    });

    it('should update seconds', () => {
      component.format = 'MM/DD/YYYY hh:mm:ss:SSS';
      expect(component.dialogModel).toBeTruthy();
      expect(moment.isMoment(component.dialogModel)).toBeTruthy();

      expect(component.hour).toBe(+LOCAL_HOUR);
      expect(component.minute).toBe(LOCAL_MIN);
      expect(component.amPmVal).toBe(LOCAL_AM_PM);
      expect(component.isCurrent()).toBe(false);
      component.apply();

      expect(component.displayValue).toEqual(`${LOCAL_DATE} 0${LOCAL_HOUR}:${LOCAL_MIN}:${LOCAL_SEC}:000`);

      const SECONDS_VALUE = 55;
      component.secondChanged(SECONDS_VALUE);

      expect(component.isCurrent()).toBe(false);
      expect(component.second).toBe(SECONDS_VALUE + '');

      component.apply();
      expect(component.displayValue).toEqual(`${LOCAL_DATE} 0${LOCAL_HOUR}:${LOCAL_MIN}:${SECONDS_VALUE}:000`);
    });

    it('should update milliseconds', () => {
      component.format = 'MM/DD/YYYY hh:mm:ss:SSS';
      expect(component.dialogModel).toBeTruthy();
      expect(moment.isMoment(component.dialogModel)).toBeTruthy();

      expect(component.hour).toBe(+LOCAL_HOUR);
      expect(component.minute).toBe(LOCAL_MIN);
      expect(component.second).toBe(LOCAL_SEC);
      expect(component.amPmVal).toBe(LOCAL_AM_PM);
      expect(component.isCurrent()).toBe(false);
      component.apply();

      expect(component.displayValue).toEqual(`${LOCAL_DATE} 0${LOCAL_HOUR}:${LOCAL_MIN}:${LOCAL_SEC}:000`);

      const MILLISECONDS_VALUE = 786;
      component.millisecondChanged(MILLISECONDS_VALUE);

      expect(component.hour).toBe(+LOCAL_HOUR);
      expect(component.minute).toBe(LOCAL_MIN);
      expect(component.second).toBe(LOCAL_SEC);
      expect(component.millisecond).toBe(MILLISECONDS_VALUE + '');
      expect(component.amPmVal).toBe(LOCAL_AM_PM);
      expect(component.isCurrent()).toBe(false);

      component.apply();
      expect(component.displayValue).toEqual(
        `${LOCAL_DATE} 0${LOCAL_HOUR}:${LOCAL_MIN}:${LOCAL_SEC}:${MILLISECONDS_VALUE}`
      );
    });

    it('should update am/pm', () => {
      expect(component.dialogModel).toBeTruthy();
      expect(moment.isMoment(component.dialogModel)).toBeTruthy();

      const newLocalAMPM = LOCAL_AM_PM === 'PM' ? 'AM' : 'PM';

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
      expect(component.amPmVal).toBe(LOCAL_AM_PM);
      expect(component.isCurrent()).toBe(false);

      component.apply();
      expect(component.displayValue).toEqual(`${LOCAL_DATE} 12:${LOCAL_MIN} ${LOCAL_AM_PM}`);
    });

    it("should update hours, set 12 AM doesn't change AM/PM", () => {
      expect(component.dialogModel).toBeTruthy();
      expect(moment.isMoment(component.dialogModel)).toBeTruthy();

      expect(component.amPmVal).toBe(LOCAL_AM_PM);

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
      expect(component.displayValue).toEqual('01/01/1990 12:39 PM');
    });

    it('should set current', () => {
      expect(component.dialogModel).toBeTruthy();
      expect(moment.isMoment(component.dialogModel)).toBeTruthy();

      component.inputType = 'date';
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

  describe('onBlur', () => {
    it('should validate and set value', () => {
      component.value = new Date();
      component.onBlur();
      expect(component.input.value).toBeDefined();
    });

    it('should allow empty value if NOT required', () => {
      component.value = '';
      component.required = false;
      component.onBlur();
      expect(component.input.value).toEqual('');
    });

    it('should invalidate and not set value', () => {
      component.inputChanged('test');
      component.onBlur();
      expect(component.input.value).toBeUndefined();
    });

    it(`should validate value but not set if hasn't changed`, () => {
      component.value = new Date();
      component.onBlur();
      component.onBlur();
      expect(component.input.value).toBeDefined();
    });

    it('should round to precision [hour]', () => {
      component.precision = 'hour';
      component.inputType = 'datetime';
      component.inputChanged(MOON_LANDING);
      component.onBlur();
      expect(component.input.value).toEqual('07/20/1969 1:00 PM');
      expect(component.value).toBeInstanceOf(Date);
    });

    it('should round to precision [minute]', () => {
      component.precision = 'minute';
      component.inputType = 'datetime';
      component.inputChanged(MOON_LANDING);
      component.onBlur();
      expect(component.input.value).toEqual('07/20/1969 1:17 PM');
      expect(component.value).toBeInstanceOf(Date);
    });

    it('should complete partial dates', () => {
      component.inputChanged('1/1');
      component.onBlur();
      const year = moment().format('YYYY');
      expect(component.input.value).toEqual(`01/01/${year}`);
      expect(component.value).toEqual(new Date(`01/01/${year}`));
    });

    it('should complete timezone dates', () => {
      component.inputType = 'datetime';
      component.timezone = 'America/Los_Angeles';
      component.inputChanged('7/20/1969');
      component.onBlur();
      expect(component.input.value).toEqual('07/20/1969 12:00 AM -07:00');
      expect(component.value).toBeInstanceOf(Date);
    });

    it('should change to default format', () => {
      component.inputChanged(MOON_LANDING);
      component.onBlur();
      expect(component.input.value).toEqual('07/20/1969');
      expect(component.value).toBeInstanceOf(Date);
    });

    it('should change format to defined format', () => {
      component.format = 'YYYY MM';
      component.inputChanged(MOON_LANDING);
      component.onBlur();
      expect(component.input.value).toEqual('1969 07');
      expect(component.value).toBeInstanceOf(Date);
    });
  });

  describe('onAmPmChange', () => {
    beforeEach(() => {
      component.dialogModel = moment(new Date());
    });

    it('should change from AM -> PM', () => {
      component.onAmPmChange('AM');
      component.onAmPmChange('PM');
      component.onAmPmChange('AM');
      component.onAmPmChange('PM');
      expect(component.amPmVal).toEqual('PM');
    });
  });

  describe('getDayDisabled', () => {
    it('should be false if date undefined', () => {
      expect(component.getDayDisabled(null)).toBeFalsy();
    });

    it('should be true when before min or after max', () => {
      component.minDate = new Date();
      component.minDate.setDate(new Date().getDate() + 2);

      component.maxDate = new Date();
      component.maxDate.setDate(new Date().getDate() - 2);

      expect(component.getDayDisabled(moment(new Date()))).toBeTruthy();
    });
  });

  describe('isTimeDisabled', () => {
    it('should be false', () => {
      component.precision = 'hours';
      expect(component.isTimeDisabled('hours')).toBeFalsy();
    });
  });

  describe('inputChanged', () => {
    it('should set valid value', () => {
      const date = new Date().toLocaleDateString();
      component.inputChanged(date);
      expect((component.value as Date).toLocaleDateString()).toEqual(date);
    });

    // TODO: fix the handling of invalid inputs in the component and update the tests
    it('should not set invalid value', () => {
      const date = 'test';
      component.inputChanged(date);
      expect(component.value).toEqual(date);
    });

    it('should always emit with inputChange output', () => {
      const invalidDate = 'abc123';
      component.inputChange.subscribe(actual => {
        expect(actual).toEqual('abc123');
      });
      component.inputChanged(invalidDate);
      expect(component.value).toEqual(invalidDate);
    });
  });

  describe('registerOnChange', () => {
    it('should register onchange callback', done => {
      const fn = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: private and only accessible within class
        expect(component.onChangeCallback).toBe(fn);
        done();
      };
      component.registerOnChange(fn);
      component.value = new Date();
    });
  });

  describe('registryOnTouched', () => {
    it('should register ontouched callback', done => {
      const fn = () => {
        expect((component as any).onTouchedCallback).toBe(fn);
        done();
      };
      component.registerOnTouched(fn);
      component.onBlur();
    });
  });

  describe('set value', () => {
    it('should emit "change" event', () => {
      component.change.subscribe(date => expect(date).toEqual(MOON_LANDING_DATE));
      component.value = MOON_LANDING;
    });

    it('should NOT emit "change" event if value does not change', () => {
      spyOn(component.change, 'emit');
      component.value = MOON_LANDING;
      component.value = MOON_LANDING_DATE;
      expect(component.change.emit).toHaveBeenCalledTimes(1);
    });

    it('should NOT emit "change" event if invalid', () => {
      spyOn(component.change, 'emit');
      component.value = 'INVALID_DATE';
      expect(component.change.emit).not.toHaveBeenCalled();
    });
  });

  describe('validation', () => {
    it('should start withy no validation issues', () => {
      expect(component.validate(component as any)).toBeNull();
    });

    it('should update Date out of range error when minDate is changed', () => {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      component.minDate = today;
      component.writeValue(yesterday);

      expect(component.validate(component as any)).toEqual({ outOfRange: true });
    });

    it('should update Date out of range error when maxDate is changed', () => {
      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      component.maxDate = yesterday;
      component.writeValue(today);

      expect(component.validate(component as any)).toEqual({ outOfRange: true });
    });

    it('should have validation message on invalid date', () => {
      component.writeValue('WHAT');
      expect(component.validate(component as any)).toEqual({ invalid: true });
    });
  });
});
