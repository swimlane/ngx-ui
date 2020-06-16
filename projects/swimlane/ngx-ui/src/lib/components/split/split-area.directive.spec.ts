import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

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
      imports: [],
      declarations: [SplitDirectiveFixture, SplitDirective, SplitAreaDirective, SplitHandleComponent]
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

  describe('updateBasis', () => {
    it('should update flex style', () => {
      component.splitAreas.first.updateBasis('50%');
      expect(component.splitAreas.first.currentFlexParts).toEqual(['1', '1', '50%']);
      expect(component.splitAreas.first.flex).toEqual('1 1 50%');
    });

    it('should update using number', () => {
      fixture.detectChanges();
      component.splitAreas.first.updateBasis('80px');
      expect(component.splitAreas.first.currentFlexParts).toEqual(['1', '1', '80px']);
      expect(component.splitAreas.first.flex).toEqual('1 1 80px');
    });
  });
});
