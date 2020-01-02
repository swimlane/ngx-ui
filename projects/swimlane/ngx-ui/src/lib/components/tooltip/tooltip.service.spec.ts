import { TooltipService } from './tooltip.service';

describe('TooltipService', () => {
  let service: TooltipService;

  beforeEach(() => {
    service = new TooltipService({ } as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
