import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { OtherServersService } from '../other-servers.service';

import { CanComponentDeactivate } from './can-deactivate-guard.service';


@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {
    id: number, 
    name: string, 
    status: string
  };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: OtherServersService,
              private route: ActivatedRoute,
              private router: Router) {}


  ngOnInit() {
    const id = +this.route.snapshot.params['id'];

    this.server = this.serversService.getServer(id);
    
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    // Retrieve query parameters and fragments
    // Just like with normal parameters, snapshot doesn't allow any reactive behaviour if something changes in the same component
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    // The second approach is using queryParams, fragment and working with Observables (for the cases when we the component may reload while in that component and the changes need to be seen)
    this.route.queryParams.subscribe(
      (params: Params) => {
        this.allowEdit = params['allowEdit'] === '1' ? true : false;
      }
    );

    this.route.fragment.subscribe();
  }


  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName, 
      status: this.serverStatus
    });

    this.changesSaved = true;

    // ../ <=> go up one level in the currently loaded route
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    // Here the logic for whether the user can leave the route is provided
    if (!this.allowEdit)
      return true;
    else if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) 
        && !this.changesSaved)
      return confirm('Do you want to discard the changes?');
    else 
      return true;
  }
}