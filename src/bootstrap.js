import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './demo/module.js';

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule);
});
