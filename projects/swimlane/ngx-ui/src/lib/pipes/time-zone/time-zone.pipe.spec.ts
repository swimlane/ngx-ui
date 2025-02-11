import moment from 'moment-timezone';

import { TimeZonePipe, TimeZoneFormatPipe } from './time-zone.pipe';

describe('TimeZonePipe', () => {
  let pipe: TimeZonePipe;

  beforeEach(() => {
    pipe = new TimeZonePipe();
  });

  it('should be empty if !input', () => {
    expect(pipe.transform(undefined, 'Asia/Tokyo')).toEqual('');
  });

  it('should get invalid timezone value', () => {
    expect(pipe.transform('test', 'Asia/Tokyo')).toEqual('test');
  });

  it('should get date without timezone', () => {
    const now = new Date();
    expect(pipe.transform(now).toString()).toEqual(moment(now).toString());
  });
});

describe('TimeZoneFormatPipe', () => {
  let pipe: TimeZoneFormatPipe;

  beforeEach(() => {
    pipe = new TimeZoneFormatPipe();
  });

  it('should be empty if !input', () => {
    expect(pipe.transform(undefined, 'Asia/Tokyo')).toEqual('');
  });

  it('should get date without timezone', () => {
    const now = new Date();
    expect(pipe.transform(now).toString()).toEqual(moment(now).toString());
  });

  it('should get date with timezone', () => {
    const now = new Date();
    expect(pipe.transform(now, 'America/Los_Angeles').toString()).toEqual(
      moment(now).tz('America/Los_Angeles').toString()
    );
  });

  it('should get date with properly formatted timezone', () => {
    const now = new Date();
    expect(pipe.transform(now, 'America/Los_Angeles', 'L LTS Z').toString()).toEqual(
      moment(now).tz('America/Los_Angeles').format('L LTS Z').toString()
    );
  });
});
