import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-new-password',
  templateUrl: './reset-new-password.component.html',
  styleUrls: ['./reset-new-password.component.css'],
})
export class ResetNewPasswordComponent {
  constructor(
    private _authSerive: AuthenticationService,
    private _router: Router,
    private formBuilder: FormBuilder
  ) {
    this.passwordForm = formBuilder.group(
      {
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
          ],
        ],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
          ],
        ],
        rePassword: [
          null,
          [
            Validators.required,
            Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
          ],
        ],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
      },
      { validators: this.passwordMatchValidator('password', 'rePassword') }
    );
  }

  isLoading: boolean = false;
  errorMsg: string = '';

  passwordForm: FormGroup = new FormGroup({});

  handleRegister(passwordForm: FormGroup) {
    if (passwordForm.valid) {
      this.isLoading = true;
      this._authSerive.registerUser(passwordForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success')
            this._router.navigate(['./login']);
          this.isLoading = false;
        },

        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.errorMsg = err.error.message;
        },

        complete: () => {
          //why complete not working
          this.isLoading = false;
        },
      });
    }
  }

  passwordMatchValidator(password: string, rePassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const rePassControl = formGroup.controls[rePassword];

      if (passwordControl.value === rePassControl.value) return;

      rePassControl.setErrors({
        passwordMatch: 'Confirm password must match with password',
      });
    };
  }
}
