import { Injectable } from "@angular/core";

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";

import { OtherServersService } from "../other-servers.service";


interface Server {
    id: number;
    name: string;
    status: string;
}


@Injectable()
export class OtherServerResolver implements Resolve<Server> {
    // Resolve <=> an interface provided by the Angular router package that allows us to run some code before the route is rendered, it'll always render the route and load the component in the end but it'll do some preloading (fetch some data the component will need from then on)
    // Resolve will wrap the data type we want to fetch
    constructor(private serversService: OtherServersService) {}


    resolve(route: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot): Server | Observable<Server> | Promise<Server> {
        return this.serversService.getServer(+route.params['id']);
    }
}