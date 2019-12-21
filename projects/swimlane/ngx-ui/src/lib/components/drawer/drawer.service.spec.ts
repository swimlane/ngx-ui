import { TestBed } from '@angular/core/testing';

import { InjectionService } from '../../services/injection.service';
import { OverlayService } from '../overlay/overlay.service';
import { DrawerService } from './drawer.service';

describe('DrawerService', () => {
  let service: DrawerService;

  beforeEach(() => {
    const injectionServiceStub = {};
    const overlayServiceStub = {
      removeTriggerComponent: () => ({}),
      instance: { zIndex: {} },
      show: () => ({}),
      click: { subscribe: () => ({}) }
    };
    TestBed.configureTestingModule({
      providers: [
        DrawerService,
        { provide: InjectionService, useValue: injectionServiceStub },
        { provide: OverlayService, useValue: overlayServiceStub }
      ]
    });
    service = TestBed.get(DrawerService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
