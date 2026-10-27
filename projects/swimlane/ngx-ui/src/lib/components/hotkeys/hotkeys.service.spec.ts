import { TestBed } from '@angular/core/testing';

import * as hk from './hotkeys.service';
import { HotkeyStatus } from './hotkey-status.enum';

describe('HotkeysService', () => {
  let service: hk.HotkeysService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [hk.HotkeysService]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(hk.HotkeysService);
  });

  afterEach(() => {
    service.clear();
    vi.restoreAllMocks();
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('add', () => {
    it('should add hotkey', () => {
      service.add('ctrl+h', {
        callback: () => ({}),
        component: {},
        description: 'test'
      });

      expect(service.hotKeys['ctrl+h']).toBeDefined();
    });

    it('should add hotkey with allowIn filter', () => {
      service.add('mod+h', {
        callback: () => ({}),
        component: {},
        description: 'test',
        allowIn: ['input']
      });

      expect(service.hotKeys['mod+h']).toBeDefined();
    });

    it('should add hotkey to arrow if one already exists for combo', () => {
      service.add('ctrl+h', {
        callback: () => ({}),
        component: {},
        description: 'test',
        allowIn: ['input']
      });

      service.add('ctrl+h', {
        callback: () => ({}),
        component: {},
        description: 'test2',
        visible: true
      });

      expect(service.hotKeys['ctrl+h'].length).toBe(2);
    });
  });

  describe('Hotkey.callback', () => {
    it('should call hotkey callback', async () => {
      service.add('ctrl+h', {
        callback: () => {},
        component: {},
        description: 'test'
      });

      expect(service.hotKeys['ctrl+h'].length).toBe(1);
      service.hotKeys['ctrl+h'][0].callback();
    });
  });

  describe('suspend', () => {
    beforeEach(() => {
      service.add('ctrl+h', {
        callback: () => ({}),
        component: 'test',
        description: 'test'
      });

      service.add('ctrl+c', {
        callback: () => ({}),
        component: {},
        description: 'test'
      });
    });

    it('should suspend hotkey', () => {
      service.suspend('test');
      expect(service.hotKeys['ctrl+h'][0].status).toEqual(HotkeyStatus.Suspended);
    });
  });

  describe('pauseOthers', () => {
    beforeEach(() => {
      service.add('ctrl+h', {
        callback: () => ({}),
        component: 'test',
        description: 'test'
      });

      service.add('ctrl+h', {
        callback: () => ({}),
        component: 'test2',
        description: 'test'
      });
    });

    it('should pause hotkey', () => {
      service.pauseOthers('test');
      expect(service.hotKeys['ctrl+h'][1].status).toContain('*');
    });
  });

  describe('unpauseOthers', () => {
    beforeEach(() => {
      service.add('ctrl+h', {
        callback: () => ({}),
        component: 'test',
        description: 'test'
      });

      service.add('ctrl+h', {
        callback: () => ({}),
        component: 'test2',
        description: 'test'
      });
    });

    it('should unpause hotkey', () => {
      service.pauseOthers('test');
      expect(service.hotKeys['ctrl+h'][1].status).toContain('*');
      service.unpauseOthers('test');
      expect(service.hotKeys['ctrl+h'][1].status).not.toContain('*');
    });
  });

  describe('activate', () => {
    beforeEach(() => {
      service.add('ctrl+h', {
        callback: () => ({}),
        component: 'test',
        description: 'test',
        status: HotkeyStatus.Disabled
      });

      service.add('ctrl+h', {
        callback: () => ({}),
        component: 'test2',
        description: 'test'
      });
    });

    it('should activate all hotkeys of component', () => {
      service.activate('test');
      expect(service.hotKeys['ctrl+h'][0].status).toEqual(HotkeyStatus.Active);
    });
  });

  describe('deregister', () => {
    beforeEach(() => {
      service.add('ctrl+h', {
        callback: () => ({}),
        component: 'test',
        description: 'test'
      });

      service.add('ctrl+h', {
        callback: () => ({}),
        component: 'test2',
        description: 'test'
      });

      service.add('ctrl+c', {
        callback: () => ({}),
        component: 'test3',
        description: 'test'
      });
    });

    it('should remove hotkey from list', () => {
      service.deregister('test');
      expect(service.hotKeys['ctrl+h'].length).toBe(1);
    });

    it('should unregister combination if no hotkeys in list', () => {
      service.deregister('test');
      service.deregister('test2');
      expect(service.hotKeys['ctrl+h']).toEqual([]);
    });

    it('should remove every hotkey of the component', () => {
      service.add('ctrl+j', {
        callback: () => ({}),
        component: 'test4',
        description: 'test'
      });

      service.add('ctrl+j', {
        callback: () => ({}),
        component: 'test4',
        description: 'test2'
      });

      service.deregister('test4');
      expect(service.hotKeys['ctrl+j']).toEqual([]);
    });

    it('should remove document listeners added for the hotkey', () => {
      const addSpy = vi.spyOn(document, 'addEventListener');
      const removeSpy = vi.spyOn(document, 'removeEventListener');

      service.add('ctrl+k', {
        callback: () => ({}),
        component: 'test4',
        description: 'test'
      });
      const added = addSpy.mock.calls.map(([type, listener]) => [type, listener]);

      service.deregister('test4');
      const removed = removeSpy.mock.calls.map(([type, listener]) => [type, listener]);

      expect(added.length).toBeGreaterThan(0);
      expect(removed).toEqual(expect.arrayContaining(added));
    });
  });

  describe('clear', () => {
    it('should remove document listeners added for all hotkeys', () => {
      const addSpy = vi.spyOn(document, 'addEventListener');
      const removeSpy = vi.spyOn(document, 'removeEventListener');

      service.add('ctrl+h', {
        callback: () => ({}),
        component: 'test',
        description: 'test'
      });
      const added = addSpy.mock.calls.map(([type, listener]) => [type, listener]);

      service.clear();
      const removed = removeSpy.mock.calls.map(([type, listener]) => [type, listener]);

      expect(added.length).toBeGreaterThan(0);
      expect(removed).toEqual(expect.arrayContaining(added));
    });
  });

  describe('Hotkey', () => {
    let fn: (target: any, name: string) => void;
    let target: any;

    beforeEach(() => {
      fn = hk.HotKey('ctrl+c', 'test');
      target = {};
    });

    it('should add hotkey on init and remove on destroy', () => {
      fn(target, 'test');
      target.ngOnInit();
      expect(service.hotKeys['ctrl+c'].length).toBe(1);
      target.ngOnDestroy();
      expect(service.hotKeys['ctrl+c'].length).toBe(0);
    });

    it('should call original oninit and ondestroy of component', () => {
      target.ngOnInit = () => ({});
      target.ngOnDestroy = () => {
        expect(service.hotKeys['ctrl+c'].length).toBe(1);
      };

      fn(target, 'test');
      target.ngOnInit();
      expect(service.hotKeys['ctrl+c'].length).toBe(1);
      target.ngOnDestroy();
      expect(service.hotKeys['ctrl+c'].length).toBe(0);
    });
  });
});
