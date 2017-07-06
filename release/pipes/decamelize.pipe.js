import { Pipe } from '@angular/core';
var DecamalizePipe = (function () {
    function DecamalizePipe() {
    }
    DecamalizePipe.prototype.transform = function (input) {
        if (!input)
            return '';
        var s = input.toString();
        return s.charAt(0).toUpperCase() + s.substr(1).replace(/[A-Z]/g, ' $&');
    };
    return DecamalizePipe;
}());
export { DecamalizePipe };
DecamalizePipe.decorators = [
    { type: Pipe, args: [{ name: 'decamalize' },] },
];
/** @nocollapse */
DecamalizePipe.ctorParameters = function () { return []; };
//# sourceMappingURL=decamelize.pipe.js.map