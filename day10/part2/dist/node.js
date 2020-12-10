"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Node = /** @class */ (function () {
    function Node(name, children) {
        this.children = [];
        this.childrenNodes = [];
        this.numChildrenPaths = 0;
        this.name = name;
        this.children = children;
    }
    Node.prototype.determineNumChildrenPaths = function () {
        var _this = this;
        if (this.childrenNodes.length === 0) {
            this.numChildrenPaths = 1;
        }
        else {
            this.childrenNodes.forEach(function (child) {
                _this.numChildrenPaths += child.numChildrenPaths;
            });
        }
    };
    return Node;
}());
exports.default = Node;
