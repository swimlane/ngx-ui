import { TestBed } from '@angular/core/testing';

import { InjectionService } from '../../services/injection/injection.service';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadingService,
        {
          provide: InjectionService,
          useValue: {
            appendComponent: () => ({
              instance: {}
            })
          }
        }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(LoadingService);
    service.progress = 0;
    service.threshold = 0;
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  describe('start', () => {
    afterEach(() => {
      service.complete();
    });

    it('should start progress', () => {
      service.start(false);
      expect(service.progress).toBe(0);
    });
  });

  describe('stop', () => {
    it('should stop progress', () => {
      service.start();
      expect(service.count).toBe(1);
      service.stop();
      expect(service.count).toBe(0);
    });
  });

  describe('reset', () => {
    it('should reset progress', () => {
      service.start(false);
      service.progress = 80;
      service.reset();
      expect(service.progress).toBe(0);
    });
  });

  describe('hide', () => {
    it('should hide without instance', () => {
      const spy = vi.spyOn(service, 'stop');
      service.hide();
      expect(spy).toHaveBeenCalled();
    });

    it('should hide progress', () => {
      service.start(false);
      expect(service.count).toBe(1);
      service.hide();
      expect(service.count).toBe(0);
    });
  });

  describe('complete', () => {
    it('should complete without instance', () => {
      service.start();
      service.start();
      service.start();
      service.complete();
      expect(service.count).toBe(2);
      service.complete(true);
      expect(service.count).toBe(0);
    });

    it('should complete progress', () => {
      service.start(false);
      service.progress = 50;
      service.complete(true);
      expect(service.progress).toBe(100);
    });
  });

  describe('Auto Increment', () => {
    it('should increment progress threshold', async () => {
      service.start();

      setTimeout(() => {
        expect(service.progress).toBeGreaterThan(0);
      }, service.threshold * 5);
    });
  });
});
