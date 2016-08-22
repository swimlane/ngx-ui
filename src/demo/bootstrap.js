import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';

import { AppModule } from './module.js';

export function main() {
  return platformBrowserDynamic()
    .bootstrapModule(AppModule);
}

if(HMR) bootloader(main);
if(!HMR) main();
