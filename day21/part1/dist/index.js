"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var helpers_1 = require("./helpers");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var foodStrings = stringInput.split("\r\n");
    var foods = [];
    var allStringAllergens = new Set();
    var allIngredients = new Set();
    foodStrings.forEach(function (foodString) {
        var ingredientsAndAllergens = foodString.split(' (contains ');
        var stringAllergens = ingredientsAndAllergens[1].split(', ');
        var l = stringAllergens.length - 1;
        stringAllergens[l] = stringAllergens[l].substring(0, stringAllergens[l].length - 1);
        stringAllergens.forEach(function (stringAllergen) {
            allStringAllergens.add(stringAllergen);
        });
        var ingredients = ingredientsAndAllergens[0].split(' ');
        ingredients.forEach(function (ingredient) {
            allIngredients.add(ingredient);
        });
        foods.push(new helpers_1.Food(stringAllergens, ingredients));
    });
    var allergens = new Set();
    allStringAllergens.forEach(function (stringAllergen) {
        var allergen = new helpers_1.Allergen(stringAllergen, new Set(allIngredients)); // ...by reference, so new Set
        var foodsWithAllergen = [];
        foods.forEach(function (food) {
            if (food.allergens.includes(stringAllergen)) {
                foodsWithAllergen.push(food);
            }
        });
        allergen.foods = foodsWithAllergen;
        allergens.add(allergen);
    });
    findIngredientsWithoutAllergens(allergens, allIngredients, foods);
}
function findIngredientsWithoutAllergens(allergens, allIngredients, foods) {
    var allergenIngredientMap = new Map();
    var stillSearching = true;
    var _loop_1 = function () {
        var ingredientsToRemove = [];
        stillSearching = false;
        allergens.forEach(function (allergen) {
            console.log("Currently checking Allergen", allergen.name);
            console.log("Currently have ingredients: ", allergen.ingredients);
            // Find and remove ingredients that can't be the match.
            allergen.ingredients.forEach(function (ingredient) {
                console.log("checking ingredient: ", ingredient);
                var possibleMatch = true;
                for (var i = 0; i < allergen.foods.length; i++) {
                    if (allergen.foods[i].ingredients.includes(ingredient) === false) {
                        possibleMatch = false;
                        break;
                    }
                }
                if (!possibleMatch) {
                    console.log("deleting ingredient: ", ingredient);
                    allergen.ingredients.delete(ingredient);
                }
            });
            console.log('--------------------------');
            // If only one ingredient left, then that must be the cause of the allergen.
            if (allergen.ingredients.size === 1) {
                var lastIngredient = Array.from(allergen.ingredients)[0];
                allergenIngredientMap.set(allergen.name, lastIngredient);
                ingredientsToRemove.push(lastIngredient);
            }
        });
        console.log('--------------------------');
        console.log('--------------------------');
        console.log('--------------------------');
        // this should break the loop, and needs to be done before we start removing ingredients from the allergens
        allergens.forEach(function (allergen) {
            if (allergen.ingredients.size > 1) {
                stillSearching = true;
            }
        });
        ingredientsToRemove.forEach(function (ingredient) {
            allergens.forEach(function (allergen) {
                // If ingredients that are already matched by a previous allergen, are still listed as possible match for a different allergen, remove them.
                if (allergen.ingredients.size > 1 && allergen.ingredients.has(ingredient)) {
                    allergen.ingredients.delete(ingredient);
                }
            });
        });
    };
    while (stillSearching) {
        _loop_1();
    }
    // Find all ingredients that are NOT mapped to a allergen
    var safeIngredients = new Set(allIngredients);
    allIngredients.forEach(function (ingredient) {
        allergenIngredientMap.forEach(function (value) {
            if (value === ingredient) {
                safeIngredients.delete(ingredient);
            }
        });
    });
    console.log(safeIngredients);
    // Count all occurences of safeIngredients;
    var numSafeOccurences = 0;
    foods.forEach(function (food) {
        food.ingredients.forEach(function (ingredient) {
            if (safeIngredients.has(ingredient)) {
                numSafeOccurences++;
            }
        });
    });
    console.log("Number of safe occurences: ", numSafeOccurences);
    console.log(allergenIngredientMap);
    var sortedMap = new Map(__spread(allergenIngredientMap.entries()).sort());
    console.log(sortedMap);
    var canonicalList = '';
    sortedMap.forEach(function (value) {
        canonicalList = canonicalList + "," + value;
    });
    console.log(canonicalList);
}
advent();
