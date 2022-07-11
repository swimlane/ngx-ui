import { TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';

import { InjectionService } from '../../services/injection/injection.service';
import { OverlayService } from '../overlay/overlay.service';
import { DialogService } from './dialog.service';
import { of } from 'rxjs';

describe('DialogService', () => {
  let service: DialogService;
  let overlayService: OverlayService;
  let injectionService: InjectionService;

  beforeEach(() => {
    const overlayServiceStub = {
      removeTriggerComponent: () => ({}),
      show: () => ({}),
      click: of({}),
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
    service = TestBed.inject(DialogService);
    overlayService = TestBed.inject(OverlayService);
    injectionService = TestBed.inject(InjectionService);
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
      const spy = spyOn(injectionService, 'appendComponent').and.returnValue(component as any);
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
      const spy = spyOn(injectionService, 'appendComponent').and.returnValue(component as any);
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
      const spy = spyOn(injectionService, 'appendComponent').and.returnValue(component as any);
      const overlaySpy = spyOn(overlayService.click, 'subscribe');

      service.create({ closeOnBlur: false });
      expect(spy).toHaveBeenCalled();
      expect(overlaySpy).not.toHaveBeenCalled();
    });

    it('should not close on blur if beforeClose returns false', () => {
      const component = {
        instance: {
          close: new EventEmitter<void>(),
          showOverlay: true,
          closeOnBlur: true,
          beforeClose: () => false
        }
      };
      const spy = spyOn(injectionService, 'appendComponent').and.returnValue(component as any);
      const overlaySpy = spyOn(overlayService.click, 'subscribe');

      service.create({ closeOnBlur: true });
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
