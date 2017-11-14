import { Pipe, PipeTransform } from '@angular/core';
var DecamalizePipe = /** @class */ (function () {
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
//# sourceMappingURL=decamelize.pipe.js.map