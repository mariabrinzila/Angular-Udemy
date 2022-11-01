import { Component } from "@angular/core";


@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styles: [`
        p {
            color: dodgerblue;
        }


        label {
            padding-right: 10px;
        }

        
        .online-status {
            color: white;
        }
    `]  
})
export class ServerComponent {
    serverID = 10;
    serverStatus = 'offline';

    constructor() {
        // Math.random() <=> returns a random floating number between 0 and 1
        // condition ? conditionIsTrueAction : conditionIsFalseAction
        this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
    }


    getServerStatus() {
        return this.serverStatus;
    }


    getColor() {
        // == <=> same value 
        // === <=> same value and same type (stricter)
        return this.serverStatus === 'online' ? 'green' : 'red';
    }
}