import { TestBed } from '@angular/core/testing';
import { InjectionService } from '../../services/injection.service';
import { LoadingService } from './loading.service';
describe('LoadingService', () => {
  let service: LoadingService;
  beforeEach(() => {
    const injectionServiceStub = { appendComponent: () => ({}) };
    TestBed.configureTestingModule({
      providers: [LoadingService, { provide: InjectionService, useValue: injectionServiceStub }]
    });
    service = TestBed.get(LoadingService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  it('threshold defaults to: 250', () => {
    expect(service.threshold).toEqual(250);
  });
  describe('hide', () => {
    it('makes expected calls', () => {
      spyOn(service, 'stop');
      service.hide();
      expect(service.stop).toHaveBeenCalled();
    });
  });
});
