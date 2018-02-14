var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InjectionService, IconRegisteryService } from './services';
import { DirectivesModule } from './directives';
import { PipesModule } from './pipes';
import { CalendarModule, CodeEditorModule, LoadingModule, DrawerModule, DropdownModule, ButtonModule, LongPressButtonModule, InputModule, SectionModule, SliderModule, TabsModule, ToolbarModule, TooltipModule, OverlayModule, DialogModule, OverlayService, DialogService, DrawerService, TooltipService, ToggleModule, DateTimeModule, CheckboxModule, NotificationModule, NotificationService, SelectModule, IconModule, LoadingService, TreeModule, SplitModule, HotkeysModule, NagModule, RadioButtonModule } from './components';
/**
 * Exported Modules
 * @type {Array}
 */
var modules = [
    CalendarModule, CodeEditorModule, DirectivesModule,
    DrawerModule, DropdownModule, ButtonModule, FlexLayoutModule,
    InputModule, SectionModule, SliderModule, TabsModule,
    ToolbarModule, TooltipModule, CommonModule, FormsModule,
    OverlayModule, DialogModule, ToggleModule, DateTimeModule,
    CheckboxModule, NotificationModule, PipesModule, SelectModule,
    IconModule, LoadingModule, TreeModule, SplitModule, HotkeysModule, NagModule,
    LongPressButtonModule, RadioButtonModule
];
var NgxUIModule = /** @class */ (function () {
    function NgxUIModule() {
    }
    NgxUIModule = __decorate([
        NgModule({
            providers: [
                DrawerService,
                InjectionService,
                IconRegisteryService,
                TooltipService,
                LoadingService,
                DialogService,
                OverlayService,
                NotificationService
            ],
            exports: modules.slice(),
            imports: modules.slice()
        })
    ], NgxUIModule);
    return NgxUIModule;
}());
export { NgxUIModule };
//# sourceMappingURL=ngx-ui.module.js.map