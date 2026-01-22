import { LongPressDirective } from './long-press.directive';

describe('LongPressDirective', () => {
  let directive: LongPressDirective;
  const mockMouseEvent: MouseEvent = {
    stopPropagation: () => undefined,
    preventDefault: () => undefined
  } as any;

  beforeEach(() => {
    directive = new LongPressDirective();
  });

  it('should be defined', () => {
    expect(directive).toBeDefined();
  });

  describe('onPress', () => {
    it('should do nothing when disabled', () => {
      const spy = spyOn(directive.longPressStart, 'emit');
      directive.disabled = true;
      directive.onPress(mockMouseEvent);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should start pressing', () => {
      const spy = spyOn(directive.longPressStart, 'emit');
      directive.onPress(mockMouseEvent);
      expect(spy).toHaveBeenCalled();
    });

    it('should start and finish after duration', done => {
      const spyStart = spyOn(directive.longPressStart, 'emit');
      const spyFinish = spyOn(directive.longPressFinish, 'emit');

      directive.duration = 0;
      directive.onPress(mockMouseEvent);

      expect(spyStart).toHaveBeenCalled();

      setTimeout(() => {
        expect(spyFinish).toHaveBeenCalled();
        done();
      });
    });

    it('should start and cancel before duration', done => {
      const spyStart = spyOn(directive.longPressStart, 'emit');
      const spyFinish = spyOn(directive.longPressFinish, 'emit');
      const spyCancel = spyOn(directive.longPressCancel, 'emit');

      directive.duration = 50;
      directive.onPress(mockMouseEvent);
      directive.onRelease();

      expect(spyStart).toHaveBeenCalled();
      expect(spyCancel).toHaveBeenCalled();

      setTimeout(() => {
        expect(spyFinish).not.toHaveBeenCalled();
        done();
      }, directive.duration);
    });
  });
});
