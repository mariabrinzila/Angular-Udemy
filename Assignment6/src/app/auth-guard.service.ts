import { Injectable } from "@angular/core";

import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, 
    RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";

import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    // Router guards <=> guard certain actions (for example navigating to a route or away from it)
    // CanActivate <=> an interface provided by the Angular router package to protect access to a route and all its child routes
    // CanActivateChild <=> an interface provided by the Angular router package to protect access to child routes of a route 
    constructor(private authService: AuthService,
                private router: Router) {}


    canActivate(route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated().then(
            (authenticated: boolean) => {
                if (authenticated)
                    return true;
                else 
                    this.router.navigate(['/']);
            }
        );
    }


    canActivateChild(route: ActivatedRouteSnapshot, 
                    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}