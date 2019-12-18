import { SelectOptionInputTemplateDirective } from './select-option-input-template.directive';

describe('SelectOptionInputTemplateDirective', () => {
  let directive: SelectOptionInputTemplateDirective;

  beforeEach(() => {
    directive = new SelectOptionInputTemplateDirective(undefined);
  });

  it('should be defined', () => {
    expect(directive).toBeDefined();
  });
});
