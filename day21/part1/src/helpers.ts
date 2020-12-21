export class Food{
  ingredients: string[];
  allergens: string[];

  constructor(foodString: string){
    const ingredientsAndAllergens = foodString.split(' (contains ');
    this.ingredients = ingredientsAndAllergens[0].split(' ');
    this.allergens = ingredientsAndAllergens[1].split(', ');
    const l = this.allergens.length - 1;
    this.allergens[l] = this.allergens[l].substring(0, this.allergens[l].length-1);
  }
}