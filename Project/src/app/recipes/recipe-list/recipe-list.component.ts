import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 
      'https://www.bibbyskitchenat36.com/wp-content/uploads/2021/01/DSC_9104-1.jpg'),
    new Recipe('Another Test Recipe', 'This is simply another test', 
      'https://www.bibbyskitchenat36.com/wp-content/uploads/2021/01/DSC_9104-1.jpg')
  ];

  @Output()
  recipeWasSelected = new EventEmitter<Recipe>();

  constructor() {}


  ngOnInit(): void {}


  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}