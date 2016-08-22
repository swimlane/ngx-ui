import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { App } from './App.js';
import { CommonModule } from '../index.js';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, CommonModule],
  bootstrap: [App]
})
export class AppModule {

  constructor(appRef: ApplicationRef) {
    this.appRef = appRef;
  }

  hmrOnInit(store) {
    if (!store) return;
    
    // inject AppStore here and update it
    console.log('HMR store', store);
  }

  hmrOnDestroy(store) {
    var cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);

    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);

    // inject your AppStore and grab state then set it on store
    // var appState = this.AppStore.get()
    // Object.assign(store, appState)

    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts()
    delete store.disposeOldHosts;
    // anything you need done the component is removed
  }
}
