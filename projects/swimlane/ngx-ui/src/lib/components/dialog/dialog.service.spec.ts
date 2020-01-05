import { TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';

import { InjectionService } from '../../services/injection.service';
import { OverlayService } from '../overlay/overlay.service';
import { DialogService } from './dialog.service';

describe('DialogService', () => {
  let service: DialogService;
  let overlayService: OverlayService;
  let injectionService: InjectionService;

  beforeEach(() => {
    const overlayServiceStub = {
      removeTriggerComponent: () => ({}),
      show: () => ({}),
      click: { subscribe: () => ({}) },
      instance: { zIndex: {} }
    };

    const injectionServiceStub = {
      appendComponent: () => undefined
    };

    TestBed.configureTestingModule({
      providers: [
        DialogService,
        { provide: InjectionService, useValue: injectionServiceStub },
        { provide: OverlayService, useValue: overlayServiceStub }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(DialogService);
    overlayService = TestBed.get(OverlayService);
    injectionService = TestBed.get(InjectionService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    it('should kill subscriptions when component closes', () => {
      const component = {
        instance: {
          close: new EventEmitter<void>(),
          showOverlay: true,
          closeOnBlur: true
        }
      };
      const spy = spyOn(injectionService, 'appendComponent').and.returnValue(component);
      const destroySpy = spyOn(service, 'destroy');

      service.create({ closeOnBlur: true });
      expect(spy).toHaveBeenCalled();
      component.instance.close.emit();
      expect(destroySpy).toHaveBeenCalled();
    });

    it('should create without overlay', () => {
      const component = {
        instance: {
          close: new EventEmitter<void>(),
          showOverlay: false,
          closeOnBlur: false
        }
      };
      const spy = spyOn(injectionService, 'appendComponent').and.returnValue(component);
      const overlaySpy = spyOn(overlayService, 'show');

      service.create({ closeOnBlur: false });
      expect(spy).toHaveBeenCalled();
      expect(overlaySpy).not.toHaveBeenCalled();
    });

    it('should not close on blur', () => {
      const component = {
        instance: {
          close: new EventEmitter<void>(),
          showOverlay: true,
          closeOnBlur: false
        }
      };
      const spy = spyOn(injectionService, 'appendComponent').and.returnValue(component);
      const overlaySpy = spyOn(overlayService.click, 'subscribe');

      service.create({ closeOnBlur: false });
      expect(spy).toHaveBeenCalled();
      expect(overlaySpy).not.toHaveBeenCalled();
    });
  });

  describe('destroy', () => {
    it('should destroy with overlay', () => {
      const spy = spyOn(overlayService, 'removeTriggerComponent');
      service.destroy({ instance: { showOverlay: true } });
      expect(spy).toHaveBeenCalled();
    });

    it('should destroy without overlay', () => {
      const spy = spyOn(overlayService, 'removeTriggerComponent');
      service.destroy({ instance: { showOverlay: false } });
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
