import { Component, DoCheck, ViewChild } from "@angular/core";

import { NgForm } from '@angular/forms';

import { CounterService } from '../services/counter.service';


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
export class HomeworksComponent implements DoCheck {
    username = '';

    paragraphDisplay = false;
    currentNumber = 0;
    buttonClicksArray = [];

    logs = [];
    logsTime = [];

    oddNumbers: number[] = [];
    evenNumbers: number[] = [];

    inactiveSwitch: number;
    activeSwitch: number;

    @ViewChild('f') 
    form: NgForm;

    subscriptions = ['Basic', 'Advanced', 'Pro'];
    defaultValue = 'Advanced';
    submitted = false;
    submittedData = {
        email: '',
        password: '',
        subscription: ''
    }

    constructor(private counterService: CounterService) {}


    ngDoCheck() {
        this.activeSwitch = this.counterService.activeSwitch;
        this.inactiveSwitch = this.counterService.inactiveSwitch;
    }


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
        if (gameData % 2 === 0)
            this.evenNumbers.push(gameData);
        else
            this.oddNumbers.push(gameData);
    }


    onSubmit() {
        console.log(this.form);
        
        this.submitted = true;
        this.submittedData.email = this.form.value.email;
        this.submittedData.password = this.form.value.password;
        this.submittedData.subscription = this.form.value.subscription;
    }
}