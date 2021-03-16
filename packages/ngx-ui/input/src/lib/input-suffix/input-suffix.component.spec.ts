import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSuffixComponent } from './input-suffix.component';

describe('InputSuffixComponent', () => {
  let component: InputSuffixComponent;
  let fixture: ComponentFixture<InputSuffixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputSuffixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSuffixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
