import { Injectable } from "@angular/core";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Router } from "@angular/router";

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
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient,
                private router: Router) {}


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


    autoLogin() {
        const userData: {
            id: string,
            email: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        // If there's no stored user data, we can't do anything (the user needs to sign in on its own)
        if (!userData) 
            return;

        // Create a new User object with the fetched data
        const loadedUser = new User(userData.id, userData.email, userData._token, 
            new Date(userData._tokenExpirationDate));

        // Check the token's validity using the getter
        if (loadedUser.token) {
            // Emit this user as the current user
            this.user.next(loadedUser);

            // Configure expiration duration (it's the current exipration date in milisecods - the current timestamp in miliseconds)
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - 
                new Date().getTime();
            
            // Configure auto logout
            this.autoLogout(expirationDuration);
        }
    }


    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);

        // Clear the user's data from the local storage
        localStorage.removeItem('userData');

        // If we have an active timer, clear it
        if (this.tokenExpirationTimer) 
            clearTimeout(this.tokenExpirationTimer);

        this.tokenExpirationTimer = null;
    }


    autoLogout(expirationDuration: number) {
        // expirationDuration is the amount of miliseconds until a user's token becomes invalid
        // Set a timer until expirationDuration after that time runs out, call the logout method 
        this.tokenExpirationTimer = setTimeout(
            () => {
                this.logout();
            }, 
            expirationDuration
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
        const user = new User(id, email, token, expirationDate);

        this.user.next(user);

        // Configure auto logout
        this.autoLogout(expiresIn * 1000);

        // Persist user information by storing it in the local storage
        localStorage.setItem('userData', JSON.stringify(user));
    }
}