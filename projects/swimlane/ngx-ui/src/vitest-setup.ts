import '@angular/compiler';
import '@analogjs/vitest-angular/setup-zone';
import { provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { setupTestBed } from '@analogjs/vitest-angular/setup-testbed';

setupTestBed({
  zoneless: false,
  providers: [provideZoneChangeDetection(), provideAnimationsAsync()]
});
