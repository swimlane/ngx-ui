import { SelectOptionDirective } from './select-option.directive';

describe('SelectOptionDirective', () => {
  let directive: SelectOptionDirective;

  beforeEach(() => {
    directive = new SelectOptionDirective();
  });

  it('should be defined', () => {
    expect(directive).toBeDefined();
  });

  it('should get option template', () => {
    expect(directive.optionTemplate).toBeUndefined();
  });

  it('should get input template', () => {
    expect(directive.inputTemplate).toBeUndefined();
  });

  it('should set and get disabled', () => {
    directive.disabled = 'true' as any;
    expect(directive.disabled).toBeTruthy();
  });

  it('should set and get hidden', () => {
    directive.hidden = 'true' as any;
    expect(directive.hidden).toBeTruthy();
  });
});
