const { sync } = require('sass-color-json');
const path = require('path');
const { writeFileSync } = require('fs');

const joinPath = path.join.bind(path, path.resolve(__dirname, '../src/styles/colors/'));

const branding = sync({ input: joinPath('branding.scss') });

writeFileSync(joinPath('branding.json'), JSON.stringify(branding, null, ' '));



