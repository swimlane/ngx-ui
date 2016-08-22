import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './module.js';

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule);
});
