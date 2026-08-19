/** Fixed lengths only — `fr`/`auto` cannot be trimmed with calc(). */
const FIXED_LENGTH_TRACK = /^-?\d*\.?\d+(px|rem|em|ch|vw|vh|vmin|vmax|pt|%)$/;

export function splitGridTracks(template: string): string[] {
  const tracks: string[] = [];
  let current = '';
  let depth = 0;

  for (const char of template) {
    if (char === '(') {
      depth++;
    } else if (char === ')') {
      depth--;
    }

    if (depth === 0 && /\s/.test(char)) {
      if (current) {
        tracks.push(current);
        current = '';
      }
      continue;
    }

    current += char;
  }

  if (current) {
    tracks.push(current);
  }

  return tracks;
}

export function shrinkFirstColumnTrack(template: string | undefined | null, shrinkPx: number): string | undefined {
  if (!template || shrinkPx <= 0) {
    return template ?? undefined;
  }

  const tracks = splitGridTracks(template);
  if (!tracks.length || !FIXED_LENGTH_TRACK.test(tracks[0])) {
    return template;
  }

  tracks[0] = `calc(${tracks[0]} - ${shrinkPx}px)`;
  return tracks.join(' ');
}
