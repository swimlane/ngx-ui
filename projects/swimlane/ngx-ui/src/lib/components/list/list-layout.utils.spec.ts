import { shrinkFirstColumnTrack, splitGridTracks } from './list-layout.utils';

describe('list-layout.utils', () => {
  describe('splitGridTracks', () => {
    it('splits plain tracks', () => {
      expect(splitGridTracks('16rem 1fr 1fr')).toEqual(['16rem', '1fr', '1fr']);
    });

    it('keeps functions with commas and spaces intact', () => {
      expect(splitGridTracks('minmax(0, 1fr) repeat(2, 8rem) auto')).toEqual([
        'minmax(0, 1fr)',
        'repeat(2, 8rem)',
        'auto'
      ]);
    });

    it('tolerates padding and repeated whitespace', () => {
      expect(splitGridTracks('  5rem   2fr ')).toEqual(['5rem', '2fr']);
    });
  });

  describe('shrinkFirstColumnTrack', () => {
    it('trims the indent off a fixed first track and leaves the rest alone', () => {
      expect(shrinkFirstColumnTrack('16rem 8rem 1fr', 40)).toBe('calc(16rem - 40px) 8rem 1fr');
    });

    it('supports other fixed units', () => {
      expect(shrinkFirstColumnTrack('240px 1fr', 20)).toBe('calc(240px - 20px) 1fr');
      expect(shrinkFirstColumnTrack('25% 1fr', 20)).toBe('calc(25% - 20px) 1fr');
    });

    it('leaves the template alone when the first track has no fixed size to give back', () => {
      expect(shrinkFirstColumnTrack('2fr 1fr', 40)).toBe('2fr 1fr');
      expect(shrinkFirstColumnTrack('auto 1fr', 40)).toBe('auto 1fr');
      expect(shrinkFirstColumnTrack('minmax(0, 1fr) 1fr', 40)).toBe('minmax(0, 1fr) 1fr');
    });

    it('is a no-op without an indent or a template', () => {
      expect(shrinkFirstColumnTrack('16rem 1fr', 0)).toBe('16rem 1fr');
      expect(shrinkFirstColumnTrack(undefined, 40)).toBeUndefined();
      expect(shrinkFirstColumnTrack(null, 40)).toBeUndefined();
    });
  });
});
