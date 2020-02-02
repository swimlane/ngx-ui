import { StepContentDirective } from './step-content.directive';

describe('StepContentDirective', () => {
  let directive: StepContentDirective;

  beforeEach(() => {
    directive = new StepContentDirective({ } as any);
  });

  it('should be defined', () => {
    expect(directive).toBeDefined();
  });
});
