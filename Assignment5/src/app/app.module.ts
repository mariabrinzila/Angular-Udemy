import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { HomeworksComponent } from './homeworks/homeworks.component';
import { CockpitComponent } from './cockpit/cockpit.component';
import { ServerElementComponent } from './server-element/server-element.component';
import { GameControlComponent } from './homeworks/game-control/game-control.component';
import { OddComponent } from './homeworks/odd/odd.component';
import { EvenComponent } from './homeworks/even/even.component';
import { OddNumbersComponent } from './odd-numbers/odd-numbers.component';
import { AccountComponent } from './account/account.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
import { ActiveUsersComponent } from './active-users/active-users.component';

import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';
import { BetterHighlightDirective } from './better-highlight/better-highlight.directive';
import { EvenBetterHighlightDirective } from './even-better-highlight/even-better-highlight.directive';
import { UnlessDirective } from './unless/unless.directive';

import { AccountsService } from './services/accounts.service';
import { LoggingService } from './services/logging.service';


@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    HomeworksComponent,
    CockpitComponent,
    ServerElementComponent,
    GameControlComponent,
    OddComponent,
    EvenComponent,
    OddNumbersComponent,
    AccountComponent,
    NewAccountComponent,
    InactiveUsersComponent,
    ActiveUsersComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    EvenBetterHighlightDirective,
    UnlessDirective
  ],

  imports: [
    BrowserModule,
    FormsModule
  ],

  providers: [
    AccountsService,
    LoggingService
  ],

  bootstrap: [AppComponent]
})
export class AppModule {}