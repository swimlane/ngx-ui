import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { InputPrefixComponent } from './input-prefix.component';
describe('InputPrefixComponent', () => {
  let component: InputPrefixComponent;
  let fixture: ComponentFixture<InputPrefixComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [InputPrefixComponent]
    });
    fixture = TestBed.createComponent(InputPrefixComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
});
