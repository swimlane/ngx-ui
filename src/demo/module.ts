import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { App } from './App';
import { CommonModule } from '../index';

@NgModule({
  declarations: [App],
  imports: [BrowserModule, CommonModule, FormsModule],
  bootstrap: [App]
})
export class AppModule {

  constructor(private appRef: ApplicationRef) {
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
