import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, 
    HttpRequest } from "@angular/common/http";

import { Observable, tap } from "rxjs";


export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /* console.log('Request is on its way');
        console.log(req.url); */

        const modifiedReq = req.clone({
            // url: 'some-new-url',
            headers: req.headers.append('Auth', 'xyz')
        });

        return next.handle(modifiedReq);
    }
}