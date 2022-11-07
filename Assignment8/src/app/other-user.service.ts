import { Injectable } from "@angular/core";

import { Subject } from "rxjs";


@Injectable({
    // The same as providing it in the app module
    providedIn: 'root'
})
export class OtherUserService {
    // Subject <=> a special kind of observable (we call next, not emit on it)
    // A subject is more active since we can actively call next on it from outside (not from the inside when created like it's done with a normal observable)
    // Using subjects for this sort of action (cross component communication through services) is recommended as opposed to using event emitters
    activatedEmitter = new Subject<boolean>();
}