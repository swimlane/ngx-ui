import { TimeZonePipe } from './time-zone.pipe';

describe('TimeZonePipe', () => {
  it('create an instance', () => {
    const pipe = new TimeZonePipe();
    expect(pipe).toBeTruthy();
  });
});
