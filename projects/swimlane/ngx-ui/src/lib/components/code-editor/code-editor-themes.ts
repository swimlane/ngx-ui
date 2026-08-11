import { Extension } from '@codemirror/state';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { monokai } from '@uiw/codemirror-theme-monokai';
import { eclipse } from '@uiw/codemirror-theme-eclipse';

/**
 * Map legacy CM5 theme names to CodeMirror 6 theme extensions.
 * Unknown themes fall back to dracula (previous ngx-ui default).
 */
export function themeExtensionForName(theme?: string): Extension {
  const name = (theme || 'dracula').toLowerCase();

  switch (name) {
    case 'dracula':
      return dracula;
    case 'monokai':
      return monokai;
    case 'eclipse':
    case 'default':
      return eclipse;
    default:
      return dracula;
  }
}
