// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'core-js/es7/reflect';
import 'zone.js';
import 'zone.js/testing';
import { NgModule } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  providers: [provideAnimationsAsync()]
})
class TestModule {}

getTestBed().initTestEnvironment([BrowserTestingModule, TestModule], platformBrowserTesting());
