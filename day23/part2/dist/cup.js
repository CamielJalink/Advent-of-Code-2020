"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cup = void 0;
var Cup = /** @class */ (function () {
    function Cup(name) {
        this.prevCup = this;
        this.nextCup = this;
        this.name = name;
    }
    return Cup;
}());
exports.Cup = Cup;
