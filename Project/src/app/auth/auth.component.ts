import { Component } from "@angular/core";

import { Router } from "@angular/router";

import { NgForm } from "@angular/forms";

import { Observable } from "rxjs";

import { AuthResponseData, AuthService } from "./auth.service";


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, 
                private router: Router) {}


    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }


    onSubmit(form: NgForm) {
        if (!form.valid) 
            return;

        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;

        // Store the Observable returned by one of the 2 possible requests (for login or sign up)
        let authObservable: Observable<AuthResponseData>;

        if (!this.isLoginMode) {
            authObservable = this.authService.signUp(email, password);
        }
        else {
            authObservable = this.authService.login(email, password);
        }

        authObservable.subscribe(
            responseData => {
                console.log(responseData);

                this.isLoading = false;

                // Navigate away from the authentication page
                this.router.navigate(['/recipes']);
            },
            errorMessage => {
                this.error = errorMessage;
                this.isLoading = false;
            }
        );

        // Reset form after the data has been submitted
        form.reset();
    }
}