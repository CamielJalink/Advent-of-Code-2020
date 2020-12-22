"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Allergen = exports.Food = void 0;
var Food = /** @class */ (function () {
    function Food(stringAllergens, ingredients) {
        this.allergens = stringAllergens;
        this.ingredients = ingredients;
    }
    return Food;
}());
exports.Food = Food;
var Allergen = /** @class */ (function () {
    function Allergen(name, ingredients) {
        this.foods = [];
        this.name = name;
        this.ingredients = ingredients;
    }
    return Allergen;
}());
exports.Allergen = Allergen;
