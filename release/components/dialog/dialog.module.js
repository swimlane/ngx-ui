var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InjectionService } from '../../services';
import { OverlayModule } from '../overlay';
import { InputModule } from '../input';
import { AlertComponent, AlertService } from './alert';
import { DialogComponent } from './dialog.component';
import { DialogService } from './dialog.service';
var DialogModule = /** @class */ (function () {
    function DialogModule() {
    }
    DialogModule = __decorate([
        NgModule({
            declarations: [DialogComponent, AlertComponent],
            exports: [DialogComponent, AlertComponent],
            providers: [DialogService, AlertService, InjectionService],
            imports: [CommonModule, OverlayModule, InputModule, FormsModule],
            entryComponents: [DialogComponent, AlertComponent]
        })
    ], DialogModule);
    return DialogModule;
}());
export { DialogModule };
//# sourceMappingURL=dialog.module.js.map