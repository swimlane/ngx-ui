import { ElementRef } from '@angular/core';

import { DblClickCopyDirective } from './dbl-click-copy.directive';

describe('DblClickCopyDirective', () => {
  let directive: DblClickCopyDirective;
  let elementRef: ElementRef<HTMLElement>;

  beforeEach(() => {
    elementRef = { nativeElement: document.createElement('div') };
    directive = new DblClickCopyDirective(elementRef);
  });

  it('should be defined', () => {
    expect(directive).toBeDefined();
  });

  it('should copy element content', () => {
    const spyEvent = spyOn(directive.onCopy, 'emit');
    const spyExec = spyOn(document, 'execCommand');

    directive.onDblClick();
    expect(spyEvent).toHaveBeenCalled();
    expect(spyExec).toHaveBeenCalled();
  });
});
