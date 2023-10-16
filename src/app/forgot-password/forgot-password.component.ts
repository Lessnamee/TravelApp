import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(
    private formBuilder: FormBuilder, public authService: AuthService
  ) {}

  forgotForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]]
    });

}
