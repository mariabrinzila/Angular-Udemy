import { Injectable } from "@angular/core";

import { Subject } from "rxjs";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

import { ShoppingListService } from "../shopping-list/shopping-list.service";


// The services for a particular feature should be placed in the respective feature's folder
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  /* private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel', 
      'A super tasty schnitzel - just awesome', 
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoa7wRYtrm_zVM9HHxUAknaVYkujrCc3zsoA&usqp=CAU',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'Big Fat Burger', 
      'What else do you need to say?', 
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoENyW2-Y8v4nt4kmhBc5lEbv8546L3xozaQ&usqp=CAU',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]
    )
  ]; */
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}


  getRecipes() {
      // this.recipes.slice() makes an exact copy of the given array so any changes made on it doesn't change the service's property too (since JavaScript objects and arrays are reference types)
      return this.recipes.slice(); 
  }


  getRecipe(index: number) {
    return this.recipes[index];
  }


  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }


  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }


  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;

    this.recipesChanged.next(this.recipes.slice());
  }


  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }


  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;

    this.recipesChanged.next(this.recipes.slice());
  }
}