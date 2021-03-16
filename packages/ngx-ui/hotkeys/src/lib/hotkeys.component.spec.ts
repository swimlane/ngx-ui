import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotkeysComponent } from './hotkeys.component';

describe('HotkeysComponent', () => {
  let component: HotkeysComponent;
  let fixture: ComponentFixture<HotkeysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotkeysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotkeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
