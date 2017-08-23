// corejs
import 'core-js/es6';
import 'core-js/es7/object';
import 'core-js/es7/reflect';

// typescript
import 'ts-helpers';

// zonejs
import 'zone.js/dist/zone';

// rx
import 'rxjs';

// angular2
import { disableDebugTools } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import '@angular/common';
import '@angular/forms';

// optimization for production
// https://github.com/AngularClass/angular2-webpack-starter/blob/master/src/platform/environment.ts#L17
if(IS_PRODUCTION) {
  disableDebugTools();
  enableProdMode();
}

if(IS_DEV) {
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
