import { TestBed } from '@angular/core/testing';
import { InjectionService } from '../../services/injection.service';
import { OverlayService } from '../overlay/overlay.service';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;
  beforeEach(() => {
    const injectionServiceStub = {};
    const overlayServiceStub = {
      removeTriggerComponent: () => ({}),
      show: () => ({}),
      click: { subscribe: () => ({}) },
      instance: { zIndex: {} }
    };
    TestBed.configureTestingModule({
      providers: [
        DialogService,
        { provide: InjectionService, useValue: injectionServiceStub },
        { provide: OverlayService, useValue: overlayServiceStub }
      ]
    });
    service = TestBed.get(DialogService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  it('zIndex defaults to: 995', () => {
    expect(service.zIndex).toEqual(995);
  });
  it('type defaults to: DialogComponent', () => {
    expect(service.type).toEqual(DialogComponent);
  });
});
