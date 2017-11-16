var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var IterableMapPipe = /** @class */ (function () {
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
    IterableMapPipe = __decorate([
        Pipe({ name: 'iterableMap' })
    ], IterableMapPipe);
    return IterableMapPipe;
}());
export { IterableMapPipe };
//# sourceMappingURL=iterable-map.pipe.js.map