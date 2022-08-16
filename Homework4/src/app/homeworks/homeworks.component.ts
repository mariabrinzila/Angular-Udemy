import { Component } from "@angular/core";


@Component({
    selector: 'app-homeworks',
    templateUrl: './homeworks.component.html',
    styles: [`
        label {
            padding-right: 10px;
        }


        .colored {
            color: white;
        }
    `]  
})
export class HomeworksComponent {
    username = '';

    paragraphDisplay = false;
    currentNumber = 0;
    buttonClicksArray = [];

    logs = [];
    logsTime = [];

    oddNumbers = [];
    evenNumbers = [];

    isUsernameEmpty() {
        if (this.username == '')
            return true;
        
        return false;
    }


    resetUsername() {
        this.username = '';
    }


    toggleDisplay() {
        this.paragraphDisplay = !this.paragraphDisplay;
        
        this.currentNumber++;
        this.buttonClicksArray.push(this.currentNumber);
    }


    getBackgroundColor(element: number) {
        var index = this.buttonClicksArray.indexOf(element);

        return index >= 4 ? 'blue' : 'white';
    }


    getColored(element: number) {
        var index = this.buttonClicksArray.indexOf(element);
        
        return index >= 4;
    }


    onToggle() {
        this.logs.push(this.logs.length + 1);
        this.logsTime.push(new Date());
    }


    onGameStarted(gameData: number) {
        console.log('Game data:' + gameData);

        if (gameData % 2 != 0)
            this.oddNumbers.push(gameData);
        else
            this.evenNumbers.push(gameData);
    }
}