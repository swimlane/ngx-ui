import { TestBed } from '@angular/core/testing';
import { InjectionService } from '../../../services/injection.service';
import { OverlayService } from '../../overlay/overlay.service';
import { AlertTypes } from './alert.types';
import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';
describe('AlertService', () => {
  let service: AlertService;
  beforeEach(() => {
    const injectionServiceStub = {};
    const overlayServiceStub = {};
    const alertTypesStub = {};
    TestBed.configureTestingModule({
      providers: [
        AlertService,
        { provide: InjectionService, useValue: injectionServiceStub },
        { provide: OverlayService, useValue: overlayServiceStub },
        { provide: AlertTypes, useValue: alertTypesStub }
      ]
    });
    service = TestBed.get(AlertService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  it('type defaults to: AlertComponent', () => {
    expect(service.type).toEqual(AlertComponent);
  });
});
