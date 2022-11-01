import { Component, OnInit } from '@angular/core';

import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenUsernames = ['Steven', 'Anna'];

  constructor() {}


  ngOnInit() {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      /*'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),*/
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])
    });

    this.signUpForm.valueChanges.subscribe(
      (value) => {
        console.log(value);
      }
    );

    this.signUpForm.statusChanges.subscribe(
      (status) => {
        console.log('Status change: ' + status);
      }
    );

    this.signUpForm.setValue({
      'userData': {
        'username': 'Maria',
        'email': 'maria.brinzila@gmail.com'
      },
      'gender': 'female',
      'hobbies': []
    });

    this.signUpForm.patchValue({
      'userData': {
        'username': 'MariaBrinzila'
      }
    });
  }


  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }


  getControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }


  get controls() {
    return (this.signUpForm.get('hobbies') as FormArray).controls;
  }


  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    // this.forbiddenUsernames won't work unless we bind this to the function when we use it in the form control
    if (this.forbiddenUsernames.indexOf(control.value) !== -1)
      return { 'forbiddenName': true };

    return null;
  }


  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    // Asynchronous validator
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@gmail.com')
          resolve({ 'forbiddenEmail': true })
        else
          resolve(null);
      }, 1500);
    });

    return promise;
  }


  onSubmit() {
    console.log(this.signUpForm);
    
    this.signUpForm.reset();
  }
}