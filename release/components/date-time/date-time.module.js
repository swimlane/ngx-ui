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
var DateTimeModule = (function () {
    function DateTimeModule() {
    }
    DateTimeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [DateTimeComponent],
                    exports: [DateTimeComponent],
                    imports: [
                        CommonModule, FormsModule, InputModule, DialogModule,
                        MomentModule, CalendarModule, ToggleModule, FlexLayoutModule
                    ]
                },] },
    ];
    /** @nocollapse */
    DateTimeModule.ctorParameters = function () { return []; };
    return DateTimeModule;
}());
export { DateTimeModule };
//# sourceMappingURL=date-time.module.js.map