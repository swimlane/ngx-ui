export default null;

// Adds mustache as an overlay to text/html
// @ts-ignore
(function (mod) {
  if (typeof window !== 'undefined') {
    import('codemirror').then(e => mod(e.default ?? e));
  }
})(function (CodeMirror) {
  CodeMirror.defineMode(
    'mustache',
    /* istanbul ignore next */ function (config: any, parserConfig: any) {
      const mustacheOverlay = {
        token(stream: any, _: any) {
          let ch: any;
          if (stream.match('{{')) {
            // eslint-disable-next-line no-cond-assign
            while ((ch = stream.next()) != null)
              if (ch === '}' && stream.next() === '}') {
                stream.eat('}');
                return 'mustache';
              }
          }
          while (stream.next() != null && !stream.match('{{', false)) {
            continue;
          }

          return null;
        }
      };
      return CodeMirror.overlayMode(CodeMirror.getMode(config, parserConfig.backdrop || 'text/html'), mustacheOverlay);
    }
  );
});
