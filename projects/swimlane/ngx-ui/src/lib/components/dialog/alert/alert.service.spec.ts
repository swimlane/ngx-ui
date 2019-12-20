import { TestBed } from '@angular/core/testing';

import { InjectionService } from '../../../services/injection.service';
import { OverlayService } from '../../overlay/overlay.service';
import { AlertTypes } from './alert-types.enum';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

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
    service = TestBed.get(AlertService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
