import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { OtherUserService } from '../other-user.service';


@Component({
  selector: 'app-user',
  templateUrl: './other-user.component.html',
  styleUrls: ['./other-user.component.css']
})
export class OtherUserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute,
              private userService: OtherUserService) {}


  ngOnInit() {
    // Observable <=> a data source (for example user input events, HTTP requests) 
    // Observer <=> the code (for example the subscribe function)
    // The observer can handle data, errors or the completion (these are hooks in which we write the code which will be executed when they happen)
    // Stream <=> between an observable and the observer (here we can have multiple events emitted)
    // There are observables that never complete (for example those hooked to a button)
    // Observables are used for asynchronous tasks (we don't know when they'll happen and how long they'll take)
    // We subscribe to observables to be informed about the changes in the data
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
      }
    );
  }


  onActivate() {
    this.userService.activatedEmitter.next(true);
  }
}