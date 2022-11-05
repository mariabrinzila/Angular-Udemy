import { Component, DoCheck, OnInit, ViewChild } from "@angular/core";

import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { Observable } from "rxjs";

import { CounterService } from '../services/counter.service';

import { CustomValidators } from "../custom-validators";


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
export class HomeworksComponent implements DoCheck, OnInit {
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
    };

    projectStatus = ['Stable', 'Critical', 'Finished'];
    projectForm: FormGroup;
    projectSubmitted = false;
    projectInformation = {
        name: '',
        email: '',
        status: ''
    };

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


    ngOnInit() {
        this.projectForm = new FormGroup({
            'name': new FormControl(null, [Validators.required, 
                this.forbiddenProjectName.bind(this)], CustomValidators.forbiddenProjectNameAsync),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'status': new FormControl('Finished')
        });
    }


    forbiddenProjectName(control: FormControl): { [s: string]: boolean } {
        if (control.value === 'Test')
            return { 'forbiddenProjectName': true };
        
        return null;
    }


    forbiddenProjectNameAsync(control: FormControl): Promise<any> | Observable<any> {
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    if (control.value === 'TestAsync')
                        resolve({ 'forbiddenProjectNameAsync': true });
                    else
                        resolve(null);
                }, 1500);
            }
        );
    }


    onSubmitProject() {
        this.projectInformation.name = this.projectForm.get('name').value;
        this.projectInformation.email = this.projectForm.get('email').value;
        this.projectInformation.status = this.projectForm.get('status').value;
        this.projectSubmitted = true;

        console.log(this.projectForm);
    }
}