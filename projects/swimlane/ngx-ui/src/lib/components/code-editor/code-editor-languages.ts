import { Extension } from '@codemirror/state';
import { StreamLanguage, LanguageSupport } from '@codemirror/language';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { yaml } from '@codemirror/lang-yaml';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';

/** Minimal mustache/handlebars-style {{ }} highlighter over plain text. */
const mustacheLanguage = StreamLanguage.define({
  name: 'mustache',
  token(stream) {
    if (stream.match('{{')) {
      while (!stream.eol()) {
        if (stream.match('}}')) {
          return 'tag';
        }
        stream.next();
      }
      return 'tag';
    }
    stream.next();
    return null;
  }
});

/** Spreadsheet-like cell tokens (letters, digits, operators). */
const spreadsheetLanguage = StreamLanguage.define({
  name: 'spreadsheet',
  token(stream) {
    if (stream.eatSpace()) {
      return null;
    }
    if (stream.match(/^[A-Za-z]+[0-9]+/)) {
      return 'variableName';
    }
    if (stream.match(/^[0-9]+(\.[0-9]+)?/)) {
      return 'number';
    }
    if (stream.match(/^[+\-*/^=(),]/)) {
      return 'operator';
    }
    stream.next();
    return null;
  }
});

/** Lightweight PowerShell-ish highlighter. */
const powershellLanguage = StreamLanguage.define({
  name: 'powershell',
  token(stream) {
    if (stream.eatSpace()) {
      return null;
    }
    if (stream.match(/^#.*/)) {
      return 'comment';
    }
    if (stream.match(/^"[^"]*"?/) || stream.match(/^'[^']*'?/)) {
      return 'string';
    }
    if (stream.match(/^\$[A-Za-z_][\w-]*/)) {
      return 'variableName';
    }
    if (stream.match(/^[A-Za-z_][\w-]*/)) {
      return 'keyword';
    }
    stream.next();
    return null;
  }
});

function resolveModeName(mode: any): string {
  if (!mode) {
    return '';
  }
  if (typeof mode === 'string') {
    return mode.toLowerCase();
  }
  if (typeof mode === 'object' && mode.name) {
    return String(mode.name).toLowerCase();
  }
  return '';
}

function isJsonMode(mode: any): boolean {
  if (!mode || typeof mode !== 'object') {
    return false;
  }
  return !!mode.json || mode.name === 'application/json';
}

/**
 * Map legacy CodeMirror 5 mode values to CodeMirror 6 language extensions.
 */
export function languageExtensionForMode(mode: any): Extension {
  const name = resolveModeName(mode);

  if (name === 'javascript' || name === 'js') {
    return isJsonMode(mode) ? json() : javascript();
  }
  if (name === 'json' || name === 'application/json') {
    return json();
  }
  if (name === 'yaml' || name === 'yml') {
    return yaml();
  }
  if (name === 'python') {
    return python();
  }
  if (name === 'htmlmixed' || name === 'html' || name === 'text/html') {
    return html();
  }
  if (name === 'handlebars' || name === 'mustache') {
    return new LanguageSupport(mustacheLanguage);
  }
  if (name === 'spreadsheet') {
    return new LanguageSupport(spreadsheetLanguage);
  }
  if (name === 'powershell') {
    return new LanguageSupport(powershellLanguage);
  }

  // Unknown / unset — plain editor (no language)
  return [];
}

export function isJsonLikeMode(mode: any): boolean {
  const name = resolveModeName(mode);
  return name === 'json' || name === 'application/json' || isJsonMode(mode);
}
