export function containsFilter(value, keyword, depth) {
    if (depth === void 0) { depth = 0; }
    if (value === undefined || value === null)
        return false;
    if (depth > 2)
        return false;
    var type = typeof value;
    if (type === 'string') {
        if (!isNaN(value))
            return value === keyword;
        return value.indexOf(keyword) > -1;
    }
    else if (type === 'object') {
        var keys = Object.keys(value);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var k = keys_1[_i];
            if (containsFilter(value[k], keyword, depth + 1)) {
                return true;
            }
        }
    }
}
//# sourceMappingURL=select-helper.js.map