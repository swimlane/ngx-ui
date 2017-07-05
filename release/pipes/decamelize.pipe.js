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
    DecamalizePipe.decorators = [
        { type: Pipe, args: [{ name: 'decamalize' },] },
    ];
    /** @nocollapse */
    DecamalizePipe.ctorParameters = function () { return []; };
    return DecamalizePipe;
}());
export { DecamalizePipe };
//# sourceMappingURL=decamelize.pipe.js.map