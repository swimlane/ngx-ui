import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var hotkeys = {};
var hotkeyChangedSource = new Subject();
export function _combToString(combination) {
    return combination.slice().sort().join('+').toLowerCase();
}
export function _stringToComb(combination) {
    var parts = combination.split('+');
    var comb = [];
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        part = part.trim();
        if (part.length === 0 || part === '+') {
            continue;
        }
        comb.push(part.toLowerCase());
    }
    return comb.sort(function (a, b) {
        var special = ['ctrl', 'shift', 'alt', 'meta'];
        if (special.includes(a)) {
            return -1;
        }
        if (special.includes(b)) {
            return 1;
        }
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    });
}
export function _activate(component) {
    for (var comb in hotkeys) {
        var hotkeyList = hotkeys[comb];
        for (var _i = 0, hotkeyList_1 = hotkeyList; _i < hotkeyList_1.length; _i++) {
            var hotkey = hotkeyList_1[_i];
            if (hotkey.component === component) {
                hotkey.status = 'active';
            }
        }
    }
    hotkeyChangedSource.next(hotkeys);
}
export function _add(combination, hotkey) {
    var combArray = _stringToComb(combination);
    var combString = _combToString(combArray);
    hotkey.combination = combArray;
    hotkey.status = 'active';
    if (hotkeys[combString] === undefined) {
        hotkeys[combString] = [];
    }
    hotkeys[combString].push(hotkey);
    hotkeyChangedSource.next(hotkeys);
}
export function _suspend(component) {
    for (var comb in hotkeys) {
        var hotkeyList = hotkeys[comb];
        for (var _i = 0, hotkeyList_2 = hotkeyList; _i < hotkeyList_2.length; _i++) {
            var hotkey = hotkeyList_2[_i];
            if (hotkey.component === component) {
                hotkey.status = 'suspended';
            }
        }
    }
    hotkeyChangedSource.next(hotkeys);
}
export function _deregister(component) {
    for (var comb in hotkeys) {
        var hotkeyList = hotkeys[comb];
        for (var _i = 0, hotkeyList_3 = hotkeyList; _i < hotkeyList_3.length; _i++) {
            var hotkey = hotkeyList_3[_i];
            if (hotkey.component === component) {
                hotkeys[comb].splice(hotkeys[comb].indexOf(hotkey), 1);
            }
        }
    }
    hotkeyChangedSource.next(hotkeys);
}
export function _keyPress(event) {
    var combination = _getCombination(event);
    var combStr = _combToString(combination);
    if (hotkeys[combStr]) {
        for (var _i = 0, _a = hotkeys[combStr]; _i < _a.length; _i++) {
            var hotkey = _a[_i];
            if (hotkey.status === 'active') {
                hotkey.callback();
            }
        }
        return false;
    }
    return true;
}
export function _getCombination(event) {
    var combination = [];
    combination.push(event.key.toLowerCase());
    if (event.metaKey) {
        combination.push('meta');
    }
    if (event.ctrlKey) {
        combination.push('ctrl');
    }
    if (event.shiftKey) {
        combination.push('shift');
    }
    if (event.altKey) {
        combination.push('alt');
    }
    return combination;
}
export function Hotkey(key, description) {
    return function (target, name, descriptor) {
        var oldInit = target.ngOnInit;
        target.ngOnInit = function () {
            var _this = this;
            if (oldInit)
                oldInit.bind(this)();
            _add(key, {
                callback: function () {
                    target[name].bind(_this)();
                },
                description: description,
                component: this
            });
        };
        var oldDestroy = target.ngOnDestroy;
        target.ngOnDestroy = function () {
            if (oldDestroy)
                oldDestroy.bind(this)();
            _deregister(this);
        };
    };
}
var HotkeysService = (function () {
    function HotkeysService() {
        this.hotkeys = hotkeys;
        this.add = _add;
        this.suspend = _suspend;
        this.activate = _activate;
        this.deregister = _deregister;
        this.keyPress = _keyPress;
        this.changeEvent = hotkeyChangedSource.asObservable();
    }
    return HotkeysService;
}());
export { HotkeysService };
HotkeysService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HotkeysService.ctorParameters = function () { return []; };
//# sourceMappingURL=hotkeys.service.js.map