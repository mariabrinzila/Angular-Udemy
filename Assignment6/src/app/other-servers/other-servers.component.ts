import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { OtherServersService } from './other-servers.service';


@Component({
  selector: 'app-other-servers',
  templateUrl: './other-servers.component.html',
  styleUrls: ['./other-servers.component.css']
})
export class OtherServersComponent implements OnInit {
  public servers: {
    id: number, 
    name: string, 
    status: string
  }[] = [];

  // The currently loaded route can be injected (ActivatedRoute)
  constructor(private serversService: OtherServersService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit() {
    this.servers = this.serversService.getServers();
  }


  onReload() {
    // other-servers <=> a relative path
    // As opposed to using a relative path in the routerLink, using the navigate method doesn't trigger an error because unlike routerLink, navigate doesn't know which is the currently loaded route
    // In order to tell navigate which is the currently loaded route, it needs a second argument which can configure it
    // relativeTo is by default the root domain, which is why we didn't get an error
    this.router.navigate(['/other-servers'], { relativeTo: this.route });
  }
}