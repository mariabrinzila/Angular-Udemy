import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {
    id: number,
    name: string
  };

  paramsSubscription: Subscription;

  // ActivatedRoute will give us access to the id passed in the URL
  constructor(private route: ActivatedRoute) {}


  ngOnInit() {
    // To fetch the parameter in a URL <=> currentRoute.snapshot.params['parameterName']
    // Data is fetched and loaded, if we weren't in that component before (the default behaviour) 
    // So if you have a link with parameters in component A that goes to component A with different parameters, the URL will change but the output fetched data won't
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }

    // React to subsequent chenges in the fetched data from the URL <=> currentRoute.params (it's an Observable, similar to Future in Dart)
    // This approach is only for the situations when a component may be updated from inside that component
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }


  ngOnDestroy() {
    // Angular does this by default behind the scenes
    this.paramsSubscription.unsubscribe();
  }
}