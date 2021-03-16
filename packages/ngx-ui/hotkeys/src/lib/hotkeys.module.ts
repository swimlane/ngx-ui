import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { HotkeysComponent } from './hotkeys.component';
import { HotkeysFactoryService, HotkeysService } from './services';

@NgModule({
  imports: [CommonModule],
  declarations: [HotkeysComponent],
  exports: [HotkeysComponent]
})
export class HotkeysModule {
  // instantiate FactoryService right away
  constructor(_: HotkeysFactoryService) {}

  private static hasBeenCalled = false;

  static forRoot(): ModuleWithProviders<HotkeysModule> {
    if (this.hasBeenCalled) {
      throw new Error('HotkeysModule has already been initialized');
    }

    this.hasBeenCalled = true;
    return {
      ngModule: HotkeysModule,
      providers: [HotkeysService, HotkeysFactoryService]
    };
  }
}
