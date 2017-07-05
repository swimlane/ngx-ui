import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IterableMapPipe } from './iterable-map.pipe';
import { FilterPipe } from './filter.pipe';
import { DecamalizePipe } from './decamelize.pipe';
import { JSONTreePipe } from './json-tree.pipe';
var PipesModule = (function () {
    function PipesModule() {
    }
    PipesModule.decorators = [
        { type: NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    PipesModule.ctorParameters = function () { return []; };
    return PipesModule;
}());
export { PipesModule };
//# sourceMappingURL=pipes.module.js.map