import momentTimezone from 'moment-timezone';

import { TimeZonePipe } from './time-zone.pipe';

describe('TimeZonePipe', () => {
  let pipe: TimeZonePipe;

  beforeEach(() => {
    pipe = new TimeZonePipe();
  });

  it('should be empty if !input', () => {
    expect(pipe.transform(undefined, 'America/Los_Angeles')).toEqual('');
  });

  it('should get invalid timezone value', () => {
    expect(pipe.transform('test', 'America/Los_Angeles')).toEqual('test');
  });

  it('should get date without timezone', () => {
    const now = new Date();
    expect(pipe.transform(now)).toEqual(momentTimezone(now));
  });
});
