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
    `]  
})
export class ServerComponent {
    serverID = 10;
    serverStatus = 'offline';
    username = '';

    getServerStatus() {
        return this.serverStatus;
    }


    isUsernameEmpty() {
        if (this.username == '')
            return true;
        
        return false;
    }


    resetUsername() {
        this.username = '';
    }
}