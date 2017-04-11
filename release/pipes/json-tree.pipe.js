import { Pipe } from '@angular/core';
var JSONTreePipe = (function () {
    function JSONTreePipe() {
    }
    JSONTreePipe.prototype.transform = function (input) {
        return [jsonToTree(input)];
    };
    return JSONTreePipe;
}());
export { JSONTreePipe };
JSONTreePipe.decorators = [
    { type: Pipe, args: [{ name: 'jsonTree' },] },
];
/** @nocollapse */
JSONTreePipe.ctorParameters = function () { return []; };
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