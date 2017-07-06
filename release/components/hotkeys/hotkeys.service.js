var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as Mousetrap from 'mousetrap';
var hotkeys = {};
var hotkeyChangedSource = new Subject();
var isMac = window.navigator && window.navigator.platform.indexOf('Mac') !== -1;
/*tslint:disable*/
var map = {
    command: '\u2318',
    shift: '\u21E7',
    left: '\u2190',
    right: '\u2192',
    up: '\u2191',
    down: '\u2193',
    'return': '\u23CE',
    backspace: '\u232B' // ⌫
};
/*tslint:enable*/
function _getDisplay(combo) {
    var keys = combo.split('+');
    var result = [];
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
        var k = keys_1[_i];
        if (k === 'mod' && isMac) {
            result.push(map.command);
            continue;
        }
        var mapped = map[k];
        result.push(mapped || k);
    }
    return result;
}
export function _add(combo, opts) {
    opts.status = opts.status || 'active';
    opts.keys = _getDisplay(combo);
    opts.visible = opts.visible !== undefined ? opts.visible : true;
    Mousetrap.bind(combo, callback);
    if (hotkeys[combo] === undefined) {
        hotkeys[combo] = [];
    }
    hotkeys[combo].push(opts);
    hotkeyChangedSource.next(hotkeys);
    function callback(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        else {
            // internet explorer
            event.returnValue = false;
        }
        if (opts && opts.status === 'active') {
            opts.zone.run(function () {
                opts.callback(event);
            });
        }
    }
}
export function _suspend(comp) {
    for (var comb in hotkeys) {
        var hotkeyList = hotkeys[comb];
        for (var _i = 0, hotkeyList_1 = hotkeyList; _i < hotkeyList_1.length; _i++) {
            var hotkey = hotkeyList_1[_i];
            if (hotkey.component === comp) {
                hotkey.status = 'suspended';
            }
        }
    }
    hotkeyChangedSource.next(hotkeys);
}
export function _activate(comp) {
    for (var comb in hotkeys) {
        var hotkeyList = hotkeys[comb];
        for (var _i = 0, hotkeyList_2 = hotkeyList; _i < hotkeyList_2.length; _i++) {
            var hotkey = hotkeyList_2[_i];
            if (hotkey.component === comp) {
                hotkey.status = 'active';
            }
        }
    }
    hotkeyChangedSource.next(hotkeys);
}
export function _deregister(comp) {
    for (var comb in hotkeys) {
        var hotkeyList = hotkeys[comb];
        for (var _i = 0, hotkeyList_3 = hotkeyList; _i < hotkeyList_3.length; _i++) {
            var hotkey = hotkeyList_3[_i];
            if (hotkey.component === comp) {
                hotkeys[comb].status = 'disabled';
                hotkeys[comb].splice(hotkeys[comb].indexOf(hotkey), 1);
            }
        }
        if (!hotkeyList.length) {
            Mousetrap.unbind(comb);
        }
    }
    hotkeyChangedSource.next(hotkeys);
}
export function Hotkey(key, description, options) {
    return function (target, name, descriptor) {
        var oldInit = target.ngOnInit;
        target.ngOnInit = function () {
            var _this = this;
            if (oldInit)
                oldInit.bind(this)();
            _add(key, __assign({ callback: function () {
                    target[name].bind(_this)();
                }, description: description, component: this, zone: new NgZone({ enableLongStackTrace: false }) }, options));
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
    function HotkeysService(ngZone) {
        this.ngZone = ngZone;
        this.hotkeys = hotkeys;
        this.suspend = _suspend;
        this.activate = _activate;
        this.deregister = _deregister;
        this.changeEvent = hotkeyChangedSource.asObservable();
    }
    HotkeysService.prototype.add = function (combo, opts) {
        _add(combo, __assign({ zone: this.ngZone }, opts));
    };
    return HotkeysService;
}());
export { HotkeysService };
HotkeysService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HotkeysService.ctorParameters = function () { return [
    { type: NgZone, },
]; };
//# sourceMappingURL=hotkeys.service.js.map