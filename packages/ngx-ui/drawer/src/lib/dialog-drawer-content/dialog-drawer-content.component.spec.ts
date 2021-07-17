import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDrawerContentComponent } from './dialog-drawer-content.component';

describe('DialogDrawerContentComponent', () => {
  let component: DialogDrawerContentComponent;
  let fixture: ComponentFixture<DialogDrawerContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDrawerContentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDrawerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
