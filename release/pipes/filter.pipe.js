var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe, Injectable } from '@angular/core';
/**
 * Filter Pipe
 * A pipe like the old-school ng1 pipe. Use this with
 * moderation since it has performance issues.
 *
 * References:
 *  - https://github.com/VadimDez/ng2-filter-pipe
 *  - https://angular.io/docs/ts/latest/guide/pipes.html
 *
 * Example:
 *
 *    <input type="text" [(ngModel)]="stringFilter">
 *    <ul>
 *      <li *ngFor="let item of array | filterBy: stringFilter"></li>
 *    </ul>
 *
 */
var FilterPipe = /** @class */ (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (array, filter) {
        var type = typeof filter;
        if (type === 'string') {
            if (this.isNumber(filter)) {
                return array.filter(this.filterDefault(filter));
            }
            return array.filter(this.filterByString(filter));
        }
        if (type === 'object') {
            return array.filter(this.filterByObject(filter));
        }
        return array.filter(this.filterDefault(filter));
    };
    FilterPipe.prototype.filterByString = function (filter) {
        filter = filter.toLowerCase();
        return function (value) {
            return !filter || value.toLowerCase().indexOf(filter) !== -1;
        };
    };
    FilterPipe.prototype.filterByObject = function (filter) {
        var _this = this;
        return function (value) {
            for (var key in filter) {
                if (!value.hasOwnProperty(key)) {
                    return false;
                }
                var type = typeof value[key];
                var isMatching = void 0;
                /* tslint:disable prefer-conditional-expression */
                if (type === 'string') {
                    isMatching = _this.filterByString(filter[key])(value[key]);
                }
                else if (type === 'object') {
                    isMatching = _this.filterByObject(filter[key])(value[key]);
                }
                else {
                    isMatching = _this.filterDefault(filter[key])(value[key]);
                }
                /* tslint:enable prefer-conditional-expression */
                if (!isMatching) {
                    return false;
                }
            }
            return true;
        };
    };
    /**
     * Defatul filterDefault function
     *
     * @param filter
     * @returns {(value:any)=>boolean}
     */
    FilterPipe.prototype.filterDefault = function (filter) {
        return function (value) {
            return !filter || filter === value;
        };
    };
    FilterPipe.prototype.isNumber = function (value) {
        return !isNaN(parseInt(value, 10)) && isFinite(value);
    };
    FilterPipe = __decorate([
        Pipe({
            name: 'filterBy',
            pure: false
        }),
        Injectable()
    ], FilterPipe);
    return FilterPipe;
}());
export { FilterPipe };
//# sourceMappingURL=filter.pipe.js.map