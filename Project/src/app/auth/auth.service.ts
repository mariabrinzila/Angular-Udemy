import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";


interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {
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
        );
    }
}