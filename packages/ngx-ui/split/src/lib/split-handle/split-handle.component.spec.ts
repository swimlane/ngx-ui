import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitHandleComponent } from './split-handle.component';

describe('SplitHandleComponent', () => {
  let component: SplitHandleComponent;
  let fixture: ComponentFixture<SplitHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SplitHandleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
