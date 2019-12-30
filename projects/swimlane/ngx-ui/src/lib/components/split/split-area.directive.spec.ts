import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SplitDirectiveFixture } from './split.directive.fixture';
import { SplitDirective } from './split.directive';
import { SplitAreaDirective } from './split-area.directive';
import { SplitHandleComponent } from './split-handle.component';

describe('SplitAreaDirective', () => {
  let component: SplitDirectiveFixture;
  let fixture: ComponentFixture<SplitDirectiveFixture>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FlexLayoutModule],
      declarations: [
        SplitDirectiveFixture,
        SplitDirective,
        SplitAreaDirective,
        SplitHandleComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitDirectiveFixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  describe('updateStyle', () => {
    it('should update flex style', () => {
      component.splitAreas.first.updateStyle('2 2 50%');
      expect(component.splitAreas.first.currentFlexBasis).toEqual(['2', '2', '50%']);
    });

    it('should update flex style using flex directive', () => {
      component.splitAreas.first.updateStyle(undefined);
      expect(component.splitAreas.first.currentFlexBasis).toEqual(['1', '1', '50%']);
    });

    it('should update using number', () => {
      component.flex$.next('50px');
      fixture.detectChanges();
      component.splitAreas.first.updateStyle(80);
      expect(component.splitAreas.first.currentFlexBasis).toEqual(['1', '1', '80px']);
    });
  });

  describe('isPercent', () => {
    it('should check if flex directive is percent', () => {
      expect(component.splitAreas.first.isPercent()).toBeTruthy();
    });

    it('should check if basis param is percent', () => {
      expect(component.splitAreas.first.isPercent('1 1 20px')).toBeFalsy();
    });

    it('should use default value when no flex directive value', () => {
      component.flex$.next(undefined);
      fixture.detectChanges();
      expect(component.splitAreas.first.isPercent()).toBeFalsy();
    });
  });
});
