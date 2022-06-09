import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { HotkeysComponent } from './hotkeys.component';
import { HotkeysService } from './hotkeys.service';
import { HotkeyStatus } from './hotkey-status.enum';
import { Hotkey } from './hotkey.interface';

describe('HotkeysComponent', () => {
  let component: HotkeysComponent;
  let fixture: ComponentFixture<HotkeysComponent>;
  const hotkeys: Hotkey[] = [
    {
      callback: () => ({}),
      component: {},
      description: 'test',
      status: HotkeyStatus.Active,
      visible: true
    },
    {
      callback: () => ({}),
      component: {},
      description: 'test2',
      status: HotkeyStatus.Disabled
    }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [HotkeysComponent],
      providers: [HotkeysService]
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

  it('should update hotkey array from map', () => {
    component.updateHotkeys({
      'ctrl+c': hotkeys
    });

    expect(component.hotkeys$.value).toEqual([hotkeys[0]]);
  });

  it('should show', () => {
    component.show();
    expect(component.visible).toBeTruthy();
  });

  it('should hide', () => {
    component.hide();
    expect(component.visible).toBeFalsy();
  });
});
