import type { MockInstance } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { EventEmitter } from '@angular/core';

import { InjectionService } from '../../../services/injection/injection.service';
import { OverlayService } from '../../overlay/overlay.service';
import { AlertTypes } from './alert-types.enum';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;
  let spy: MockInstance<any>;
  let component: {
    instance: {
      ok: EventEmitter<void>;
      cancel: EventEmitter<void>;
    };
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlertService,
        { provide: InjectionService, useValue: {} },
        { provide: OverlayService, useValue: {} },
        { provide: AlertTypes, useValue: {} }
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(AlertService);
  });

  beforeEach(() => {
    component = {
      instance: {
        ok: new EventEmitter<void>(),
        cancel: new EventEmitter<void>()
      }
    };
    spy = vi.spyOn(service, 'create').mockReturnValue(component as any);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('should call ok', async () => {
    const subject = service.alert({});

    subject.subscribe({
      next: () => {
        expect(true).toBe(true);
      }
    });

    component.instance.ok.emit();
  });

  it('should call cancel', async () => {
    const subject = service.alert({});

    subject.subscribe({
      next: () => {
        expect(true).toBe(true);
      }
    });

    component.instance.cancel.emit();
  });

  describe('alert', () => {
    it('should create alert dialog', () => {
      service.alert({});
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('confirm', () => {
    it('should create confirm dialog', () => {
      service.confirm({});
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('prompt', () => {
    it('should create prompt dialog', () => {
      service.prompt({});
      expect(spy).toHaveBeenCalled();
    });
  });
});
