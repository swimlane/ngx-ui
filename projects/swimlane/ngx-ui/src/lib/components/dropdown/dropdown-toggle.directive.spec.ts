import { DropdownToggleDirective } from './dropdown-toggle.directive';

describe('DropdownToggleDirective', () => {
  let directive: DropdownToggleDirective;

  beforeEach(() => {
    directive = new DropdownToggleDirective({ nativeElement: {} } as any);
  });

  it('should be defined', () => {
    expect(directive).toBeTruthy();
  });

  describe('onClick', () => {
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOn(directive.toggle, 'emit');
    });

    it('should toggle', () => {
      directive.onClick({ preventDefault: () => undefined } as any);
      expect(spy).toHaveBeenCalled();
    });

    it('should not toggle when disabled', () => {
      directive.disabled = true;
      directive.onClick({ preventDefault: () => undefined } as any);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
