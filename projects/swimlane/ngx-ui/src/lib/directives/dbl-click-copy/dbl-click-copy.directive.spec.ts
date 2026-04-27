import { ElementRef } from '@angular/core';

import { DblClickCopyDirective } from './dbl-click-copy.directive';

describe('DblClickCopyDirective', () => {
  let directive: DblClickCopyDirective;
  let elementRef: ElementRef<HTMLElement>;

  beforeEach(() => {
    // jsdom does not define the deprecated document.execCommand; spyOn requires the property to exist.
    if (typeof document.execCommand !== 'function') {
      Object.defineProperty(document, 'execCommand', {
        configurable: true,
        writable: true,
        value: () => false
      });
    }

    elementRef = { nativeElement: document.createElement('div') };
    directive = new DblClickCopyDirective(elementRef);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(directive).toBeDefined();
  });

  it('should copy element content', () => {
    const spyEvent = vi.spyOn(directive.onCopy, 'emit');
    const spyExec = vi.spyOn(document, 'execCommand');

    directive.onDblClick();
    expect(spyEvent).toHaveBeenCalled();
    expect(spyExec).toHaveBeenCalled();
  });
});
