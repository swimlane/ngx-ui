import * as CodeMirror from 'codemirror';

// Adds mustache as an overlay to text/html
CodeMirror.defineMode('mustache', (config, modeOptions) => {
  return CodeMirror.overlayMode(
    CodeMirror.getMode(config, modeOptions.backdrop || 'text/html'),
    {
      token: (stream) => {
        let ch: string | null;
        if (stream.match('{{')) {
          while ((ch = stream.next()) != null)
            if (ch === '}' && stream.next() === '}') {
              stream.eat('}');
              return 'mustache';
            }
        }

        while (stream.next() != null && !stream.match('{{', false)) {}

        return null;
      },
    }
  );
});
