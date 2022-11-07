import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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
import { OtherServersComponent } from './other-servers/other-servers.component';
import { EditServerComponent } from './other-servers/edit-server/edit-server.component';
import { OtherServerComponent } from './other-servers/other-server/other-server.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { OtherUserComponent } from './other-user/other-user.component';
import { OtherHomeComponent } from './other-home/other-home.component';
import { TdFormComponent } from './td-form/td-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { PipesComponent } from './pipes/pipes.component';

import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';
import { BetterHighlightDirective } from './better-highlight/better-highlight.directive';
import { EvenBetterHighlightDirective } from './even-better-highlight/even-better-highlight.directive';
import { UnlessDirective } from './unless/unless.directive';

import { AccountsService } from './services/accounts.service';
import { LoggingService } from './services/logging.service';
import { CounterService } from './services/counter.service';
import { OtherServersService } from './other-servers/other-servers.service';
import { AuthService } from './auth.service';

import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './other-servers/edit-server/can-deactivate-guard.service';
import { OtherServerResolver } from './other-servers/other-server/other-server-resolver.service';

import { AppRoutingModule } from './app-routing.module';

import { ShortenPipe } from './shorten.pipe';
import { FilterPipe } from './filter.pipe';
import { ReversePipe } from './reverse.pipe';
import { SortPipe } from './sort.pipe';


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
    OtherServersComponent,
    EditServerComponent,
    OtherServerComponent,
    UsersComponent,
    UserComponent,
    HomeComponent,
    PageNotFoundComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    EvenBetterHighlightDirective,
    UnlessDirective,
    ErrorPageComponent,
    OtherUserComponent,
    OtherHomeComponent,
    TdFormComponent,
    ReactiveFormComponent,
    PipesComponent,
    ShortenPipe,
    FilterPipe,
    ReversePipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
    // RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AccountsService,
    LoggingService,
    CounterService,
    OtherServersService,
    AuthService, 
    AuthGuard,
    CanDeactivateGuard,
    OtherServerResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}