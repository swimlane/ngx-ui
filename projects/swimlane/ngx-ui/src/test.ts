// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'core-js/es7/reflect';
import 'zone.js';
import 'zone.js/testing';
import { NgModule } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
  providers: [provideAnimations()]
})
class TestModule {}

getTestBed().initTestEnvironment([BrowserDynamicTestingModule, TestModule], platformBrowserDynamicTesting());
