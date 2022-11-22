import { Injectable } from "@angular/core";

import { HttpInterceptor, HttpHandler, HttpRequest, HttpParams } from "@angular/common/http";

import { exhaustMap, take } from "rxjs";

import { AuthService } from "./auth.service";


@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}


    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(
                user => {
                    // If we don't have a user, we just return the original request
                    if (!user)
                        return next.handle(req);

                    // Add the token to the request by cloning the request
                    const modifiedReq = req.clone(
                        {
                            params: new HttpParams().set('auth', user.token)
                        }
                    );

                    return next.handle(modifiedReq);
                }
            )
        );
    }
}