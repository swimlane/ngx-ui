var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var JSONTreePipe = /** @class */ (function () {
    function JSONTreePipe() {
    }
    JSONTreePipe.prototype.transform = function (input) {
        return [jsonToTree(input)];
    };
    JSONTreePipe = __decorate([
        Pipe({ name: 'jsonTree' })
    ], JSONTreePipe);
    return JSONTreePipe;
}());
export { JSONTreePipe };
function jsonToTree(value, label) {
    var type = getType(value);
    var children;
    var expandable = false;
    if (typeof label === 'undefined') {
        label = label || type;
    }
    switch (type) {
        case 'object':
            children = Object.keys(value).map(function (key) { return jsonToTree(value[key], key); });
            expandable = children.length > 0;
            return {
                label: label,
                expandable: expandable,
                expanded: true,
                model: { type: type, value: value, expandable: expandable },
                children: children
            };
        case 'array':
            children = value.map(jsonToTree);
            expandable = children.length > 0;
            return {
                label: label,
                expandable: expandable,
                expanded: true,
                model: { type: type, value: value, expandable: expandable },
                children: children
            };
        default:
            return {
                label: label,
                expandable: expandable,
                model: { type: type, value: value, expandable: expandable }
            };
    }
}
function getType(item) {
    if (item == null) {
        return 'null';
    }
    return Array.isArray(item) ? 'array' : typeof item;
}
//# sourceMappingURL=json-tree.pipe.js.map