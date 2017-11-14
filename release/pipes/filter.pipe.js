import { Pipe, Injectable, PipeTransform } from '@angular/core';
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
var /**
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
FilterPipe = /** @class */ (function () {
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
    /**
       * Defatul filterDefault function
       *
       * @param filter
       * @returns {(value:any)=>boolean}
       */
    FilterPipe.prototype.filterDefault = /**
       * Defatul filterDefault function
       *
       * @param filter
       * @returns {(value:any)=>boolean}
       */
    function (filter) {
        return function (value) {
            return !filter || filter === value;
        };
    };
    FilterPipe.prototype.isNumber = function (value) {
        return !isNaN(parseInt(value, 10)) && isFinite(value);
    };
    return FilterPipe;
}());
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
export { FilterPipe };
//# sourceMappingURL=filter.pipe.js.map