var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InputModule } from '../input';
import { DialogModule } from '../dialog';
import { CalendarModule } from '../calendar';
import { ToggleModule } from '../toggle';
import { DateTimeComponent } from './date-time.component';
var DateTimeModule = /** @class */ (function () {
    function DateTimeModule() {
    }
    DateTimeModule = __decorate([
        NgModule({
            declarations: [DateTimeComponent],
            exports: [DateTimeComponent],
            imports: [
                CommonModule, FormsModule, InputModule, DialogModule,
                MomentModule, CalendarModule, ToggleModule, FlexLayoutModule
            ]
        })
    ], DateTimeModule);
    return DateTimeModule;
}());
export { DateTimeModule };
//# sourceMappingURL=date-time.module.js.map