"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
var Food = /** @class */ (function () {
    function Food(foodString) {
        var ingredientsAndAllergens = foodString.split(' (contains ');
        this.ingredients = ingredientsAndAllergens[0].split(' ');
        this.allergens = ingredientsAndAllergens[1].split(', ');
        var l = this.allergens.length - 1;
        this.allergens[l] = this.allergens[l].substring(0, this.allergens[l].length - 1);
    }
    return Food;
}());
exports.Food = Food;
