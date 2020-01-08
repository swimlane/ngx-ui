import { TestBed } from '@angular/core/testing';

import { IconRegistryService } from './icon-registry.service';

describe('IconRegistryService', () => {
  let service: IconRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [IconRegistryService] });
    service = TestBed.get(IconRegistryService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('setDefaultFontSetClass', () => {
    it('should set default class', () => {
      expect(service.setDefaultFontSetClass('test')).toEqual('test');
    });
  });

  describe('add', () => {
    it('should add icon', () => {
      service.add('test', 'test');
      expect(service.get('test').length).toEqual(1);
    });
  });

  describe('lookup', () => {
    beforeEach(() => {
      service.add('test', 'test');
    });

    it('should lookup existing icons', () => {
      expect(service.lookup(['test'])).toEqual(['ngx:test']);
    });

    it('should lookup existing icons with prefix already included', () => {
      expect(service.lookup(['ngx:test'])).toEqual(['ngx:test']);
    });
  });
});
