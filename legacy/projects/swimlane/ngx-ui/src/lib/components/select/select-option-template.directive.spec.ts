import { SelectOptionTemplateDirective } from './select-option-template.directive';

describe('SelectOptionTemplateDirective', () => {
  let directive: SelectOptionTemplateDirective;

  beforeEach(() => {
    directive = new SelectOptionTemplateDirective(undefined);
  });

  it('should be defined', () => {
    expect(directive).toBeDefined();
  });
});
