var path = require('path');
var ghpages = require('gh-pages');
var fs = require('fs');

const distPath = path.join(__dirname, '../', 'dist', 'ngx-ui');
var dir = path.resolve(distPath);

const indexFile = `${distPath}/index.html`;
fs.readFile(indexFile, 'utf8', function(err, data) {
  if (err) {
    console.log('ERROR', err);
    return;
  }
  var result = data.replace('<base href="/" />', '<base href="/ngx-ui/" />');

  fs.writeFile(indexFile, result, 'utf8', function(e) {
    if (e) {
      console.log('ERROR', e);
      return;
    }
  });
});

ghpages.publish(dir, {
  user: {
    name: 'Swimlane',
    email: 'developer@swimlane.com'
  },
  message: '(deploy): CI',
  logger: function(message) {
    console.log('gh-pages: ', message);
  }
});
