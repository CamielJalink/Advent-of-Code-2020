"use strict";
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
        var allergen = new helpers_1.Allergen(stringAllergen, allIngredients);
        var foodsWithAllergen = [];
        foods.forEach(function (food) {
            if (food.allergens.includes(stringAllergen)) {
                foodsWithAllergen.push(food);
            }
        });
        allergen.foods = foodsWithAllergen;
        allergens.add(allergen);
    });
    console.log(allergens);
    // findIngredients(foods);
}
function findIngredients(foods) {
    // let ingrAllerMap: Map<string, string> = new Map();
    // let allAllergens: Set<string> = new Set();
    // foods.forEach((food: Food) => {
    //   food.allergens.forEach((allergen: string) => {
    //     allAllergens.add(allergen);
    //   })
    // })
    // let safeIncrement: number = 0;
    // while(allAllergens.size > 0 && safeIncrement < 100){
    //   allAllergens.forEach((allergen: string) => {
    //     let allPossibleIngredients: Set<string> = new Set();
    //     foods.forEach((food: Food) => {
    //       if(food.allergens.includes(allergen)){
    //         food.ingredients.forEach((ingredient: string) => {
    //           allPossibleIngredients.add(ingredient);
    //         })
    //       }
    //     })
    //     allPossibleIngredients.forEach((ingredient: string) => {
    //       let couldBeMatch: boolean = true;
    //       foods.forEach((food: Food) => {
    //         if (food.allergens.includes(allergen)) {
    //           food.ingredients.forEach((foodIngredient: string) => {
    //           })
    //         }
    //       })
    //     })
    //     })
    //     console.log(allergen);
    //   }
    //   safeIncrement++;
    // }
    // console.log(allAllergens);
}
advent();
