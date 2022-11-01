import { NgModule } from "@angular/core";

import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { OtherServersComponent } from './other-servers/other-servers.component';
import { OtherServerComponent } from './other-servers/other-server/other-server.component';
import { EditServerComponent } from './other-servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorPageComponent } from "./error-page/error-page.component";
import { OtherHomeComponent } from "./other-home/other-home.component";
import { OtherUserComponent } from "./other-user/other-user.component";

import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./other-servers/edit-server/can-deactivate-guard.service";
import { OtherServerResolver } from "./other-servers/other-server/other-server-resolver.service";


const appRoutes: Routes = [
    {
      // The path is the URL which is entered after the domain (a string, 'URLName', withot the /)
      path: '',
  
      // The action is what should happen when the path is reached (component <=> which component should be loaded when the path is reached)
      component: HomeComponent
    },
    {
      path: 'users',
      component: UsersComponent,
      children: [
        {
          // Adding parameters (dynamic elements) to a path <=> :parameterName
          path: ':id/:name',
          component: UserComponent
        }
      ]
    },
    /* {
      // Adding parameters (dynamic elements) to a path <=> :parameterName
      path: 'users/:id/:name',
      component: UserComponent
    }, */
    {
      // children <=> is used to add an array of child routed for the current route (nested routing)
      // There must be a router-outlet in the current component so Angular knows where to load the children components
      path: 'other-servers',
      component: OtherServersComponent,
      canActivateChild: [
        // Protect all child routes of the route by AuthGuard (since we have both CanActivate and CanActivateChild implemented)
        // If we only had CanActivateChild implemented, only the child routes would be protected by AuthGuard
        AuthGuard
      ],
      /* canActivate: [
        // Define which route should be protected by the AuthGuard
        // The guards specified will automatically get applied to all child routes
        // other-servers and all its child routes will only be accessible if loggedIn is true in the AuthService (if the promise in AuthGuard returns true)
        AuthGuard
      ], */
      children: [
        {
          // Only add what's after the current route (in this case what's after other-servers/)
          path: ':id',
          component: OtherServerComponent,
          resolve: {
            // Fetch data before rendering the route and loading the component
            // Key: value pairs of what resolver will be stored in which object (object: resolver)
            server: OtherServerResolver
          }
        },
        {
          // Query parameters <=> begin with ? and there can be multiple ones separated by & (for example /users/10/Anna?mode=editing)
          // Hash fragments <=> begin with # and they are used to jump to a specific part of the app (for example /users/10/Anna?mode=editing#loading)
          path: ':id/edit', 
          component: EditServerComponent,
          canDeactivate: [CanDeactivateGuard]
        }
      ]
    },
    {
      path: 'observables',
      component: OtherHomeComponent
    },
    {
      path: 'user-observables/:id',
      component: OtherUserComponent
    },
    /* {
      path: 'not-found',
      component: PageNotFoundComponent
    }, */
    {
      // data allows us to pass static data to a route (like the error message for example)
      path: 'not-found',
      component: ErrorPageComponent,
      data: { message: 'Page not found!' }
    },
    {
      // Redirect to another route that already exists <=> redirectTo: 'path'
      // Angular redirects to a path based on the prefix (for example if the path is '', it'll always redirect since every path starts with '')
      // pathMatch: 'full' <=> we'll only get redirected, if the whole redirectTo path matches the one in the path property, not if it just starts with it
      // Catch all routes the app doesn't cover <=> ** (the wildcard route)
      // The wildcard route should be the last one since if there are any other routes after it, they'll automatically get parsed to **
      path: '**',
      redirectTo: '/not-found'
    }
];


// Module for outsourcing the routing (if we have more than a couple routes)
@NgModule({
    imports: [
        // Configure the RouterModule
        RouterModule.forRoot(appRoutes)

        // useHash <=> a configuration that when set to true, enables the location strategy that uses the URL fragment instead of the history API
        // useHash will add a # after the domain and the app server will ignore everything after the # so that the app runs even on servers that don't return the index.html file in case of the 404 error
        // RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    exports: [
        // exports tells Angular which part of this module should be accessible, if it were to be imported somewhere else
        RouterModule
    ]
})
export class AppRoutingModule {}