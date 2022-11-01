import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";


export interface CanComponentDeactivate {
    // Interface to connect the guard to the component
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}


export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    // CanActivate <=> an interface provided by the Angular router package to control the access for leaving a route
    canDeactivate(component: CanComponentDeactivate, 
                currentRoute: ActivatedRouteSnapshot, 
                currentState: RouterStateSnapshot, 
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return component.canDeactivate();
    }
}   