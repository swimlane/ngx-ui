import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotkeysComponent } from './hotkeys.component';
import { HotkeysService } from './hotkeys.service';

describe('HotkeysComponent', () => {
  let component: HotkeysComponent;
  let fixture: ComponentFixture<HotkeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotkeysComponent],
      providers: [HotkeysService],
      imports: []
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotkeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
