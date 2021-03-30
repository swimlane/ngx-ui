import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeFormatDialogContentComponent } from './large-format-dialog-content.component';

describe('LargeFormatDialogContentComponent', () => {
  let component: LargeFormatDialogContentComponent;
  let fixture: ComponentFixture<LargeFormatDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeFormatDialogContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeFormatDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
