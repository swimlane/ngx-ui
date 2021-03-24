import { DropdownMenuDirective } from './dropdown-menu.directive';

describe('DropdownMenuDirective', () => {
  let directive: DropdownMenuDirective;

  beforeEach(() => {
    directive = new DropdownMenuDirective('browser', { nativeElement: {} } as any, null);
  });

  it('should be defined', () => {
    expect(directive).toBeTruthy();
  });
});
