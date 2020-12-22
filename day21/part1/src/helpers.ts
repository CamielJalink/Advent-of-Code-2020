export class Food{
  ingredients: string[];
  allergens: string[];

  constructor(stringAllergens: string[], ingredients: string[]){
    this.allergens = stringAllergens;
    this.ingredients = ingredients;
  }
}


export class Allergen{
  name: string;
  ingredients: Set<string>;
  foods: Food[] = [];

  constructor(name: string, ingredients: Set<string>){
    this.name = name;
    this.ingredients = ingredients;
  }
}