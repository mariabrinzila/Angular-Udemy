import { Injectable } from "@angular/core";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { BehaviorSubject, catchError, throwError, tap } from "rxjs";

import { User } from "./user.model";


export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    token: string = null;

    constructor(private http: HttpClient) {}


    signUp(email: string, password: string) {
        // Sign a user up by sending a request to the URL given in the Firebase Auth REST API sign up with email / password section
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqfKAnBJTMcQgRe7hrR-dbKmvVg02GGuI',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleErrors),
            tap(
                responseData => {
                    this.handleAuthentication(responseData.email, responseData.localId,
                        responseData.idToken, +responseData.expiresIn);
                }
            )
        );
    }


    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqfKAnBJTMcQgRe7hrR-dbKmvVg02GGuI',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleErrors),
            tap(
                responseData => {
                    this.handleAuthentication(responseData.email, responseData.localId,
                        responseData.idToken, +responseData.expiresIn);
                }
            )
        );
    }


    private handleErrors(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        
        if (!errorResponse.error || !errorResponse.error.error)
            return throwError(
                () => new Error(errorMessage)
            );

        switch(errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email address exists already!';
                break;
            
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does NOT exist!';
                break;

            case 'INVALID_PASSWORD':
                errorMessage = 'This password is NOT valid!';
                break;
        } 

        return throwError(
            () => new Error(errorMessage)
        );
    }


    private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
        // Generate the expiration date for the token
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        );

        // Generate the new user
        const user = new User(email, id, token, expirationDate);

        this.user.next(user);
    }
}