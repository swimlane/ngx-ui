var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IterableMapPipe } from './iterable-map.pipe';
import { FilterPipe } from './filter.pipe';
import { DecamalizePipe } from './decamelize.pipe';
import { JSONTreePipe } from './json-tree.pipe';
var PipesModule = /** @class */ (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        NgModule({
            declarations: [
                IterableMapPipe,
                FilterPipe,
                DecamalizePipe,
                JSONTreePipe
            ],
            exports: [
                IterableMapPipe,
                FilterPipe,
                DecamalizePipe,
                JSONTreePipe
            ],
            imports: [CommonModule]
        })
    ], PipesModule);
    return PipesModule;
}());
export { PipesModule };
//# sourceMappingURL=pipes.module.js.map