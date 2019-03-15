import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SplitHandleComponent } from './split-handle.component';
describe('SplitHandleComponent', () => {
  let component: SplitHandleComponent;
  let fixture: ComponentFixture<SplitHandleComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SplitHandleComponent]
    });
    fixture = TestBed.createComponent(SplitHandleComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('direction defaults to: row', () => {
    expect(component.direction).toEqual('row');
  });
});
