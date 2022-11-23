import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    private userSubscription: Subscription;
    isAuthenticated = false;

    constructor(private dataStorageService: DataStorageService,
                private authService: AuthService) {}

    
    ngOnInit() {
        this.userSubscription = this.authService.user.subscribe(
            user => {
                // this.isAuthenticated = !user ? false : true;
                this.isAuthenticated = !!user;
            }
        );
    }


    onLogout() {
        this.authService.logout();
    }


    onSaveData() {
        this.dataStorageService.storeRecipes();
    }


    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }


    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}