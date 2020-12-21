"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    var foods = input.map(function (foodString) { return new helpers_1.Food(foodString); });
    findIngredients(foods);
}
function findIngredients(foods) {
    var ingrAllerMap = new Map();
    var allAllergens = new Set();
    foods.forEach(function (food) {
        food.allergens.forEach(function (allergen) {
            allAllergens.add(allergen);
        });
    });
    console.log(allAllergens);
}
advent();
