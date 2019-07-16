import * as CodeMirror from 'codemirror';

// Adds mustache as an overlay to text/html
CodeMirror.defineMode('mustache', function(config: any, parserConfig: any) {
  const mustacheOverlay = {
    token(stream: any, state: any) {
      let ch: any;
      if (stream.match('{{')) {
        // tslint:disable-next-line:no-conditional-assignment
        while ((ch = stream.next()) != null)
          if (ch === '}' && stream.next() === '}') {
            stream.eat('}');
            return 'mustache';
          }
      }
      while (stream.next() != null && !stream.match("{{", false)) {}
      return null;
    }
  };
  return CodeMirror.overlayMode(CodeMirror.getMode(config, parserConfig.backdrop || "text/html"), mustacheOverlay);
});