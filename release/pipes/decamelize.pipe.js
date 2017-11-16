var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Pipe } from '@angular/core';
var DecamalizePipe = /** @class */ (function () {
    function DecamalizePipe() {
    }
    DecamalizePipe.prototype.transform = function (input) {
        if (!input)
            return '';
        var s = input.toString();
        return s.charAt(0).toUpperCase() + s.substr(1).replace(/[A-Z]/g, ' $&');
    };
    DecamalizePipe = __decorate([
        Pipe({ name: 'decamalize' })
    ], DecamalizePipe);
    return DecamalizePipe;
}());
export { DecamalizePipe };
//# sourceMappingURL=decamelize.pipe.js.map