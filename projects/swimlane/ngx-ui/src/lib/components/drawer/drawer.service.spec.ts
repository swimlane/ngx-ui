import { TestBed } from '@angular/core/testing';
import { InjectionService } from '../../services/injection.service';
import { OverlayService } from '../overlay/overlay.service';
import { DrawerComponent } from './drawer.component';
import { InjectionRegisteryService } from '../../services/injection-registery.service';
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
  it('type defaults to: DrawerComponent', () => {
    expect(service.type).toEqual(DrawerComponent);
  });
  it('zIndex defaults to: 995', () => {
    expect(service.zIndex).toEqual(995);
  });
  it('size defaults to: 80', () => {
    expect(service.size).toEqual(80);
  });
});
