import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { InputSuffixComponent } from './input-suffix.component';
describe('InputSuffixComponent', () => {
  let component: InputSuffixComponent;
  let fixture: ComponentFixture<InputSuffixComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [InputSuffixComponent]
    });
    fixture = TestBed.createComponent(InputSuffixComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
