import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Params, Router, Data } from '@angular/router';

import { OtherServersService } from '../other-servers.service';


@Component({
  selector: 'app-other-server',
  templateUrl: './other-server.component.html',
  styleUrls: ['./other-server.component.css']
})
export class OtherServerComponent implements OnInit {
  server: {
    id: number, 
    name: string, 
    status: string
  };

  constructor(private serversService: OtherServersService,
              private route: ActivatedRoute,
              private router: Router) { }


  ngOnInit() {
    // data is used for retrieving the dynamic data fetched by the resolver
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );

    // The result of getting a parameter is always a string by default (since the whole route is a string)
    // Convert a string to a number <=> +stringName
    /* const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id); */

    // React to any changes
    /* this.route.params.subscribe(
      (params: Params) => {
        this.server = this.serversService.getServer(+params['id']);
      }
    ); */
  }


  onEdit() {
    // The current path we're on is other-server/id
    // By default, we lose the query parameters and fragments when we navigate to the edit route
    // To preserve query parameters <=> the queryParamsHandling property which receives a string as a value 
    // queryParamsHandling: 'merge' <=> for merging our old query parameters with any new ones we might add here
    // queryParamsHandling: 'preserve' <=> for preserving our old query parameters instead of dropping them
    this.router.navigate(['edit'], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }
}