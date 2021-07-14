import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeFormatDialogHeaderTitleComponent } from './large-format-dialog-header-title.component';

describe('LargeFormatDialogHeaderTitleComponent', () => {
  let component: LargeFormatDialogHeaderTitleComponent;
  let fixture: ComponentFixture<LargeFormatDialogHeaderTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeFormatDialogHeaderTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeFormatDialogHeaderTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
