import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AuthService } from '../auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // The Angular router can be injected into the component
  constructor(private router: Router,
              private authService: AuthService) {}


  ngOnInit() {}


  onLoadServers() {
    // Navigate programtically <=> navigate to a page not through a link, routerLink (trigger navigation through code)
    // The navigate method receives an array of the parts of the path (just like binding an array to routerLink)
    // /other-servers <=> an absolute path
    // other-servers <=> a relative path
    this.router.navigate(['/other-servers']);
  }


  onLoadServer(id: number) {
    // queryParams <=> a property used for adding query parameters programatically
    // fragment <=> a property used for adding fragments programatically
    this.router.navigate(
      ['/other-servers', id, 'edit'], 
      {
        queryParams: { allowEdit: '1' },
        fragment: 'loading'
      }
    );
  }


  onLogin() {
    this.authService.login();
  }


  onLogout() {
    this.authService.logout();
  }
}