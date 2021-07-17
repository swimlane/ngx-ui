import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeFormatDialogFooterComponent } from './large-format-dialog-footer.component';

describe('LargeFormatDialogFooterComponent', () => {
  let component: LargeFormatDialogFooterComponent;
  let fixture: ComponentFixture<LargeFormatDialogFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LargeFormatDialogFooterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeFormatDialogFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
