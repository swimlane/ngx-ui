import { DropdownMenuDirective } from './dropdown-menu.directive';

describe('DropdownMenuDirective', () => {
  let directive: DropdownMenuDirective;

  beforeEach(() => {
    directive = new DropdownMenuDirective({ nativeElement: {} } as any);
  });

  it('should be defined', () => {
    expect(directive).toBeTruthy();
  });
});
