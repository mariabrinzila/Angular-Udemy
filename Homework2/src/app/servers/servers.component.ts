import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-servers', 
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']

  /*template: `<app-server></app-server>
    <app-server></app-server>`,*/

  // selector: [app-servers] <=> attribute (<div app-servers>)
  // selector: [.app-servers] <=> class (<div class = "app-servers">)
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created!';
  serverName = 'Test server';

  // Executed when the component is created
  constructor() {
    // After 2000 ms, change allowNewServer to true
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000); 
  }


  ngOnInit(): void {}


  onCreateServer() {
    this.serverCreationStatus = 'A server was created and its name is ' + this.serverName;
  }


  onUpdateServerName(event: Event) {
    // var target = event.target as HTMLInputElement; this.serverName = target.value; 
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}