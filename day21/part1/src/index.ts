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
    let allergen = new Allergen(stringAllergen, allIngredients);
    const foodsWithAllergen: Food[] = [];
    foods.forEach((food: Food) => {
      if(food.allergens.includes(stringAllergen)){
        foodsWithAllergen.push(food);
      }
    })
    allergen.foods = foodsWithAllergen;
    allergens.add(allergen);
  })


  findIngredientsWithoutAllergens(allergens);
}


function findIngredientsWithoutAllergens(allergens: Set<Allergen>){

  // Voor elk allergen.

    // Dit zou een method kunnen zijn: 
    // Maar mogelijk moeten we uiteindelijk deze lijsten ook bijwerken adhv andere allergens...

    // Voor elk van diens ingredients
      // Voor elk van allergen z'n foods
      // Als ingredient in ELKE food zit, blijft het relevant. Elke food heeft immers deze allergen.
      // Dus: Zodra een food NIET een ingredient heeft, gooi 'm uit allergen z'n set.

}


advent();