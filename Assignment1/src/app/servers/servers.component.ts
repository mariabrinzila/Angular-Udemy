import { Component, OnInit } from '@angular/core';


@Component({
  selector: '[app-servers]', // attribute, not selector (for a class <=> .app-servers and in div class = "app-servers")
  template: `<app-server></app-server>
    <app-server></app-server>`,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  constructor() {}


  ngOnInit(): void {}
}