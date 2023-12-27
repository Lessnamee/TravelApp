// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from 'src/app/shared/services/auth.service';

// @Component({
//   selector: 'register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css'],
// })
// export class RegisterComponent {

//   constructor(
//     private formBuilder: FormBuilder, public authService: AuthService
//   ) {}

//   signupForm: FormGroup = this.formBuilder.group({
//     email: ['', [Validators.required, Validators.email]],
//     passwords: this.formBuilder.group({
//       password: ['', [Validators.required, Validators.minLength(8)]],
//       repeatpassword: ['', [Validators.required, Validators.minLength(8)]],
//     }),
//   });

// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService
  ) {}

  signupForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    passwords: this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        repeatpassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validator: this.passwordsMatchValidator }
    ),
  });

  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const repeatPassword = formGroup.get('repeatpassword')?.value;

    if (password !== repeatPassword) {
      formGroup.get('repeatpassword')?.setErrors({ notSame: true });
    } else {
      formGroup.get('repeatpassword')?.setErrors(null);
    }
  }
}
