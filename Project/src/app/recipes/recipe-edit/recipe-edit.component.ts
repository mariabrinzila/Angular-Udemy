import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute) {}


  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        // params will either be undefined (when we want to create a new recipe) or a number (when we want to edit a recipe)
        this.id = +params['id'];
        this.editMode = params['id'] != null;
      }
    );
  }
}