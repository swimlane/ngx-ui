const { sync } = require('sass-color-json');
const path = require('path');
const { writeFileSync } = require('fs');

const joinPath = path.join.bind(path, path.resolve(__dirname, '../src/styles/colors/'));

const hues = sync({ input: joinPath('hues.scss') });
const branding = sync({ input: joinPath('branding.scss') });
const element = sync({ input: joinPath('element.scss') });

writeFileSync(joinPath('colors.json'), JSON.stringify(hues, null, ' '));
writeFileSync(joinPath('branding.json'), JSON.stringify(branding, null, ' '));
writeFileSync(joinPath('element.json'), JSON.stringify(element, null, ' '));
