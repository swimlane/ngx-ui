import { Pipe } from '@angular/core';
/**
 * Map to Iteratble Pipe
 *
 * Example:
 *
 *  <div *ngFor="let keyValuePair of someObject | iterableMap">
 *    key {{keyValuePair.key}} and value {{keyValuePair.value}}
 *  </div>
 *
 * Concepts from:
 *    http://stackoverflow.com/questions/31490713/iterate-over-typescript-dictionary-in-angular-2
 *    https://webcake.co/object-properties-in-angular-2s-ngfor/
 *
 * See: https://github.com/angular/angular/issues/2246
 *
 */
var IterableMapPipe = (function () {
    function IterableMapPipe() {
    }
    IterableMapPipe.prototype.transform = function (map) {
        var result = [];
        if (!map) {
            return result;
        }
        if (map.entries) {
            for (var _i = 0, _a = map.entries(); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                result.push({ key: key, value: value });
            }
        }
        else {
            for (var key in map) {
                result.push({ key: key, value: map[key] });
            }
        }
        return result;
    };
    return IterableMapPipe;
}());
export { IterableMapPipe };
IterableMapPipe.decorators = [
    { type: Pipe, args: [{ name: 'iterableMap' },] },
];
/** @nocollapse */
IterableMapPipe.ctorParameters = function () { return []; };
//# sourceMappingURL=iterable-map.pipe.js.map