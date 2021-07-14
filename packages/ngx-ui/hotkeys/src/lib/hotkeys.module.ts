import { CommonModule } from '@angular/common';
import {
  Inject,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { HotkeysComponent } from './hotkeys.component';
import { HotkeysFactoryService, HotkeysService } from './services';

@NgModule({
  imports: [CommonModule],
  declarations: [HotkeysComponent],
  exports: [HotkeysComponent],
})
export class HotkeysModule {
  // instantiate FactoryService right away
  constructor(
    @Optional()
    @SkipSelf()
    @Inject(HotkeysModule)
    parentModule: HotkeysModule | null,
    _: HotkeysFactoryService
  ) {
    if (parentModule) {
      throw new Error(`HotkeysModule has already been loaded.`);
    }
  }

  static forRoot(): ModuleWithProviders<HotkeysModule> {
    return {
      ngModule: HotkeysModule,
      providers: [HotkeysService, HotkeysFactoryService],
    };
  }
}
