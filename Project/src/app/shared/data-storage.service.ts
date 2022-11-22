import { Injectable } from "@angular/core";

import { HttpClient, HttpParams } from "@angular/common/http";

import { take, exhaustMap, map, tap } from "rxjs";

import { AuthService } from "../auth/auth.service";
import { RecipeService } from '../recipes/recipe.service';

import { Recipe } from "../recipes/recipe.model";


@Injectable({
    // Injectable <=> we'll inject the Angular HttpClient in this service
    // providedIn: 'root' <=> alternative to providing in the providers array in the AppModule
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {}


    storeRecipes() {
        // We can also get the recipes by passing a parameter to this method recipes: Recipe[]
        const recipes = this.recipeService.getRecipes();

        // Send a PUT HTTP request with the recipes
        this.http.put(
            'https://apad-3532e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
            recipes
        ).subscribe(
            response => {
                console.log(response);
            }
        );
    }


    fetchRecipes() {
        /* return this.authService.user.pipe(
            // Get the current user
            take(1),
            exhaustMap(
                user => {
                    // Send a GET HTTP request for the recipes
                    return this.http.get<Recipe[]>(
                        'https://apad-3532e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
                        {
                            params: new HttpParams().set('auth', user.token)
                        }
                    )
                }
            ),
            map(
                recipes => {
                    return recipes.map(
                        recipe => {
                            return { 
                                ...recipe, 
                                ingredients: recipe.ingredients ? recipe.ingredients : []
                            };
                        }
                    );
                }
            ),
            tap(
                recipes => {
                    this.recipeService.setRecipes(recipes);
                }
            )
        ); */

        return this.http.get<Recipe[]>(
            'https://apad-3532e-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
        ).pipe(
            map(
                recipes => {
                    return recipes.map(
                        recipe => {
                            return { 
                                ...recipe, 
                                ingredients: recipe.ingredients ? recipe.ingredients : []
                            };
                        }
                    );
                }
            ),
            tap(
                recipes => {
                    this.recipeService.setRecipes(recipes);
                }
            )
        );
    }
}