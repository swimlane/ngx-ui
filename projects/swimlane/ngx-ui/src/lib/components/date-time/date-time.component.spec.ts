
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeComponent } from './date-time.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';
import { CalendarModule } from '../calendar/calendar.module';
import { DialogModule } from '../dialog/dialog.module';
import { InputModule } from '../input/input.module';
import { ToggleModule } from '../toggle/toggle.module';
import { PipesModule } from '../../pipes/pipes.module';

const MOON_LANDING = '1969-07-20T20:17:43Z';

const MOON_LANDING_DATE = new Date(MOON_LANDING);

const LOCAL_DATE = MOON_LANDING_DATE.toLocaleDateString('en-US', { day: '2-digit', year: 'numeric', month: '2-digit' });
const LOCAL_TIME = MOON_LANDING_DATE.toLocaleTimeString('en-US', { hour: '2-digit', minute: 'numeric' });

const LOCAL_MONTH = MOON_LANDING_DATE.toLocaleDateString('en-US', { month: '2-digit' });
const LOCAL_DAY = MOON_LANDING_DATE.toLocaleDateString('en-US', { day: '2-digit' });
const LOCAL_YEAR = '' + MOON_LANDING_DATE.toLocaleDateString('en-US', { year: 'numeric' });

const LOCAL_HOUR = LOCAL_TIME.split(':')[0];
// const LOCAL_MIN = MOON_LANDING_DATE.toLocaleTimeString('en-US', { hour: '2-digit' });
const LOCAL_AMPM = LOCAL_TIME.slice(-2);

describe('DateTimeComponent', () => {
  let component: DateTimeComponent;
  let fixture: ComponentFixture<DateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTimeComponent ],
      imports: [
        CommonModule,
        FormsModule,
        NoopAnimationsModule,
        InputModule,
        DialogModule,
        MomentModule,
        CalendarModule,
        ToggleModule,
        FlexLayoutModule,
        PipesModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeComponent);
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
      it('supports utc', () => {
        component.timezone = 'utc';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();
    
        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual('07/20/1969');
      });

      it('supports Asia/Tokyo', () => {
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

  describe('date-time mode', () => {
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
      it('supports utc', () => {
        component.timezone = 'utc';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();
    
        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual('07/20/1969 8:17 PM');
      });

      it('supports Asia/Tokyo', () => {
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
      it('date-time', () => {
        component.format = "MM DD, YYYY h:mm A";
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();
    
        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual(`${LOCAL_MONTH} ${LOCAL_DAY}, ${LOCAL_YEAR} ${LOCAL_TIME}`);
      });

      it('with timezone info - utc', () => {
        component.format = "MMM DD, YYYY HH:mm:ss Z [(]z[)]";
        component.timezone = 'utc';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();
    
        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual('Jul 20, 1969 20:17:43 +00:00 (UTC)');
      });

      it('with timezone info - jst', () => {
        component.format = "MMM DD, YYYY HH:mm:ss Z [(]z[)]";
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
      it('supports utc', () => {
        component.timezone = 'utc';
        component.writeValue(MOON_LANDING);
        fixture.detectChanges();
    
        expect(component.value).toBeTruthy();
        expect(component.value instanceof Date).toBeTruthy();
        expect(typeof component.displayValue === 'string').toBeTruthy();
        expect(component.displayValue).toEqual('8:17 PM');
      });

      it('supports Asia/Tokyo', () => {
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

});