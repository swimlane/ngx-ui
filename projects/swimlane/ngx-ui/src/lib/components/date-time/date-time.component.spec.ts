import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import moment from 'moment-timezone';
import { MomentModule } from 'ngx-moment';

import { DateTimeComponent } from './date-time.component';
import { DialogModule } from '../dialog/dialog.module';
import { PipesModule } from '../../pipes/pipes.module';
import { InjectionService } from '../../services/injection/injection.service';

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

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DateTimeComponent],
        imports: [MomentModule, PipesModule, DialogModule],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [InjectionService]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    const injectionService = TestBed.inject(InjectionService);
    fixture = TestBed.createComponent(DateTimeComponent);
    injectionService.setRootViewContainer(fixture.componentRef as any);
    component = fixture.componentInstance;
    component.disabled = false;
    component.tabindex = 0;
    component.autofocus = false;
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
      expect(component.amPmVal).toBe(LOCAL_AMPM);
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

    it('should NOT allow empty value if required', () => {
      component.value = '';
      component.required = true;
      component.onBlur();
      expect(component.input.value).toBeUndefined();
    });

    it('should invalidate and not set value', () => {
      component.value = 'test';
      component.onBlur();
      expect(component.input.value).toBeUndefined();
    });

    it('should validate value but not set if hasnt changed', () => {
      component.value = new Date();
      component.onBlur();
      component.onBlur();
      expect(component.input.value).toBeDefined();
    });

    it('should invalidate when value out of range', () => {
      component.minDate = new Date();
      component.minDate.setDate(new Date().getDate() + 2);

      component.maxDate = new Date();
      component.maxDate.setDate(new Date().getDate() - 2);

      component.value = new Date();
      component.onBlur();
      expect(component.input.value).toBeUndefined();
    });

    it('should route to precision', () => {
      component.precision = 'seconds';
      component.value = new Date().toLocaleString();
      component.onBlur();
      expect(component.input.value).not.toEqual(component.value);
    });
  });

  describe('onAmPmChange', () => {
    beforeEach(() => {
      component.dialogModel = moment(new Date());
    });

    it('should chnage from AM -> PM', () => {
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

    it('should not set invalid value', () => {
      const date = 'test';
      component.inputChanged(date);
      expect(component.value).toEqual(date);
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
      component.change.subscribe(date => expect(date).toBe(MOON_LANDING));
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
});
