
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
  });
});