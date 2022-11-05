import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { AccountsService } from './services/accounts.service';
import { CounterService } from './services/counter.service';
import { UsersService } from './services/users.service';
import { OtherUserService } from './other-user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  
  providers: [
    UsersService
    // CounterService
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Maria';
  serverElements = [{
    type: 'server',
    name: 'Testing',
    content: 'La la la test'
  }];
  accounts: { name: string, status: string }[] = [];
  activated = false;
  
  private activatedSubscription: Subscription;

  // Angular's injector is hierarchal <=> if a service is provided for a component, Angular will provide it and make an instance of it for that component and all its child components and so on (the same instance for all of them)
  // If we provide it in the AppModule, the same instance of that service is available for the whole app
  // If we provide it in the AppComponents, the same instance of that service is available for all components
  // The instances don't propagade up, only down
  // If a child components has an instance of a service provided (i1) and its parents has an instance provided too (i2), i1 will override i2
  // Make a new instance of a service in a component <=> put it in the providers of that component
  
  // If you inject something into something else, that something else must have some metadata attached to it (for example @Component etc.)
  // To inject a service into another service, we need to provide the service to be injected in the other service in the AppModule and use it in it (using @Injectable as the metadata in the service you want to inject the other service in)
  constructor(private accountsService: AccountsService,
              private userService: OtherUserService) {}


  ngOnInit() {
    this.accounts = this.accountsService.accounts;

    this.activatedSubscription = this.userService.activatedEmitter.subscribe(
      (data) => {
        this.activated = data;
        console.log('We subscribed');
      }
    );
  }


  onServerAdded(serverData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  
  onBlueprintAdded(blueprintData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }


  onChangesFirst() {
    this.serverElements[0].name = 'Changed';
  }


  onDestroyFirst() {
    this.serverElements.splice(0, 1);
  }


  ngOnDestroy() {
    // Just like with observables, we should unsubscribe from subjects when we're done with them
    this.activatedSubscription.unsubscribe();
  }
}