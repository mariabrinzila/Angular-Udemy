import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-td-form',
  templateUrl: './td-form.component.html',
  styleUrls: ['./td-form.component.css']
})
export class TdFormComponent implements OnInit {
  // Get access to the element that has the reference f
  @ViewChild('f') 
  signupForm: NgForm;

  // pet is the value of the Your first Pet? option
  defaultQuestionValue = 'pet';
  answer = '';
  genders = ['male', 'female'];
  submitted = false;
  user = {
    username: '',
    email: '',
    secret: '',
    answer: '',
    gender: ''
  }

  constructor() {}


  ngOnInit() {}


  suggestUsername() {
    const suggestedName = 'Superuser';

    /* this.signupForm.setValue({
      userData: {
        username: suggestedName,
        email: ''
      },
      secret: 'pet',
      questionAnswer: '',
      gender: 'male'
    }); */

    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });
  }


  /* onSubmit(form: NgForm) {
    console.log(form);
  } */


  onSubmit() {
    this.submitted = true;

    // Get the input data from the user with the value property
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secret = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    // Reset the form 
    this.signupForm.reset();
  }
}