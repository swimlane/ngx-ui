import { TestBed } from '@angular/core/testing';
import { IconRegisteryService } from './icon-registery.service';
describe('IconRegisteryService', () => {
  let service: IconRegisteryService;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [IconRegisteryService] });
    service = TestBed.get(IconRegisteryService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
