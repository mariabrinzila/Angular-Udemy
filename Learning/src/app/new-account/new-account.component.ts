import { Component } from '@angular/core';

import { LoggingService } from '../services/logging.service';
import { AccountsService } from '../services/accounts.service';


@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],

  // Provide the service (Angular will be able to construct the instance and give it to us)
  // providers: [LoggingService]
})
export class NewAccountComponent {
  // Dependency injection of a service (it informs Angular we'll need an instance of that service)
  constructor(private loggingService: LoggingService,
              private accountsService: AccountsService) {
    this.accountsService.statusUpdated.subscribe(
      (status: string) => alert('The new status is ' + status)
    );    
  }


  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus);
    // this.loggingService.logStatusChange(accountStatus);
  }
}
