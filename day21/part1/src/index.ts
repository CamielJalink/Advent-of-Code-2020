import { readFileSync } from "fs";
import { Food } from "./helpers";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");

  const foods: Food[] = input.map((foodString: string) => new Food(foodString));
  findIngredients(foods);
}


function findIngredients(foods: Food[]){
  let ingrAllerMap: Map<string, string> = new Map();
  let allAllergens: Set<string> = new Set();

  foods.forEach((food: Food) => {
    food.allergens.forEach((allergen: string) => {
      allAllergens.add(allergen);
    })
  })

  let safeIncrement: number = 0;
  while(allAllergens.size > 0 && safeIncrement < 100){

    allAllergens.forEach((allergen: string) => {
      let allPossibleIngredients: Set<string> = new Set();
      
      foods.forEach((food: Food) => {
        if(food.allergens.includes(allergen)){
          food.ingredients.forEach((ingredient: string) => {
            allPossibleIngredients.add(ingredient);
          })
        }
      })

      allPossibleIngredients.forEach((ingredient: string) => {
        let couldBeMatch: boolean = true;

        foods.forEach((food: Food) => {
          if (food.allergens.includes(allergen)) {
            food.ingredients.forEach((foodIngredient: string) => {
              
            })
          }
        })
      })

      }
      console.log(allergen);
    })


    safeIncrement++;
  }




  console.log(allAllergens);
}


advent();