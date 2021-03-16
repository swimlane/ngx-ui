import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPrefixComponent } from './input-prefix.component';

describe('InputPrefixComponent', () => {
  let component: InputPrefixComponent;
  let fixture: ComponentFixture<InputPrefixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputPrefixComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPrefixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
