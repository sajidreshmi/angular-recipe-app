import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Observable';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(public http: Http,
              public recipeService: RecipeService,
              public authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();

    return this.http.put('https://ng-receipe-book-sajid.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.http.get('https://ng-receipe-book-sajid.firebaseio.com/recipes.json?auth=' + token)
      .subscribe(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          recipes.forEach(recipe => {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          });
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
