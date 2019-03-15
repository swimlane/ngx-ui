import { TestBed } from '@angular/core/testing';
import { HotkeysService } from './hotkeys.service';
describe('HotkeysService', () => {
  let service: HotkeysService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HotkeysService]
    });
    service = TestBed.get(HotkeysService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
