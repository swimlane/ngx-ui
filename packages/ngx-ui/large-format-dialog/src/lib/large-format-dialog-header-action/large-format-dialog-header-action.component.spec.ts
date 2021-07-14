import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LargeFormatDialogHeaderActionComponent } from './large-format-dialog-header-action.component';

describe('LargeFormatDialogHeaderActionComponent', () => {
  let component: LargeFormatDialogHeaderActionComponent;
  let fixture: ComponentFixture<LargeFormatDialogHeaderActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LargeFormatDialogHeaderActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LargeFormatDialogHeaderActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
