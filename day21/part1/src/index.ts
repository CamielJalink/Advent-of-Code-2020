import { readFileSync } from "fs";
import { Food, Allergen } from "./helpers";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const foodStrings: string[] = stringInput.split("\r\n");

  const foods: Food[] = [];
  const allStringAllergens: Set<string> = new Set();
  const allIngredients: Set<string> = new Set();


  foodStrings.forEach((foodString: string) => {
    const ingredientsAndAllergens = foodString.split(' (contains ');
    
    const stringAllergens = ingredientsAndAllergens[1].split(', ');
    const l = stringAllergens.length - 1;
    stringAllergens[l] = stringAllergens[l].substring(0, stringAllergens[l].length - 1);
    stringAllergens.forEach((stringAllergen: string) => {
      allStringAllergens.add(stringAllergen);
    })

    const ingredients: string[] = ingredientsAndAllergens[0].split(' ');
    ingredients.forEach((ingredient: string) => {
      allIngredients.add(ingredient);
    })

    foods.push(new Food(stringAllergens, ingredients));
  })


  const allergens: Set<Allergen> = new Set();
  allStringAllergens.forEach((stringAllergen) => {
    const allergen = new Allergen(stringAllergen, new Set(allIngredients)); // ...by reference, so new Set
    const foodsWithAllergen: Food[] = [];
    foods.forEach((food: Food) => {
      if(food.allergens.includes(stringAllergen)){
        foodsWithAllergen.push(food);
      }
    })
    allergen.foods = foodsWithAllergen;
    allergens.add(allergen);
  })


  findIngredientsWithoutAllergens(allergens, allIngredients, foods);
}


function findIngredientsWithoutAllergens(allergens: Set<Allergen>, allIngredients: Set<string>, foods: Food[]){

  const allergenIngredientMap: Map<string, string> = new Map();

  let stillSearching: boolean = true;
  while (stillSearching) {
    let ingredientsToRemove: string[] = [];
    stillSearching = false;

    allergens.forEach((allergen: Allergen) => {
      console.log("Currently checking Allergen", allergen.name);
      console.log("Currently have ingredients: ", allergen.ingredients);

      // Find and remove ingredients that can't be the match.
      allergen.ingredients.forEach((ingredient) => {
        console.log("checking ingredient: ", ingredient);
        let possibleMatch: boolean = true;

        for(let i = 0; i < allergen.foods.length; i++){
          if(allergen.foods[i].ingredients.includes(ingredient) === false){
            possibleMatch = false;
            break;
          }
        }

        if(!possibleMatch){
          console.log("deleting ingredient: ", ingredient);
          allergen.ingredients.delete(ingredient);
        }
      })

      console.log('--------------------------');

      // If only one ingredient left, then that must be the cause of the allergen.
      if(allergen.ingredients.size === 1){
        const lastIngredient: string = Array.from(allergen.ingredients)[0];
        allergenIngredientMap.set(allergen.name, lastIngredient);
        ingredientsToRemove.push(lastIngredient);
      }
    })

    console.log('--------------------------');
    console.log('--------------------------');
    console.log('--------------------------');


    // this should break the loop, and needs to be done before we start removing ingredients from the allergens
    allergens.forEach((allergen: Allergen) => {
      if (allergen.ingredients.size > 1) {
        stillSearching = true;
      }
    })

    ingredientsToRemove.forEach((ingredient: string) => {
      allergens.forEach((allergen: Allergen) => {
        // If ingredients that are already matched by a previous allergen, are still listed as possible match for a different allergen, remove them.
        if(allergen.ingredients.size > 1 && allergen.ingredients.has(ingredient)){
          allergen.ingredients.delete(ingredient);
        }
      })
    })
    // ingredientsToRemove = [];     //  Deze zou ik kunnen legen, maar mogelijk wil ik 'm gewoon gelijk gebruiken? 
  }


  // Find all ingredients that are NOT mapped to a allergen
  const safeIngredients: Set<string> = new Set(allIngredients);
  allIngredients.forEach((ingredient: string) => {
    allergenIngredientMap.forEach((value:string) => {
      if(value === ingredient){
        safeIngredients.delete(ingredient);
      }
    })
  })

  console.log(allergenIngredientMap);
  console.log(safeIngredients);


  // Count all occurences of safeIngredients;
  let numSafeOccurences: number = 0;

  foods.forEach((food: Food) => {
    food.ingredients.forEach((ingredient: string) => {
      if (safeIngredients.has(ingredient)) {
        numSafeOccurences++;
      }
    })
  })

  console.log("Number of safe occurences: ", numSafeOccurences);
}


advent();