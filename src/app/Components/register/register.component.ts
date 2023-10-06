import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  signupForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    passwords: this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatpassword: ['', [Validators.required, Validators.minLength(8)]],
    }),
  });

  signupFormSubmit() {}
}
