import { trigger, transition, useAnimation } from '@angular/animations';
import { Component } from '@angular/core';
import {
  fadeInAnimation,
  fadeOutAnimation,
  fadeRightAnimation,
} from '../../../../../animations/animations';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [fadeInAnimation, fadeOutAnimation, fadeRightAnimation],
})
export class ProfileComponent {
  constructor(
    private _authSerive: AuthenticationService,
    private _router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.passwordForm = formBuilder.group(
      {
        currentPassword: [null, [Validators.required]],
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
      },
      { validators: this.passwordMatchValidator('password', 'rePassword') }
    );
  }

  isLoading: boolean = false;
  errorMsg: string = '';

  passwordForm: FormGroup = new FormGroup({});

  handleNewPassword(passwordForm: FormGroup) {
    if (passwordForm.valid) {
      this.isLoading = true;
      this._authSerive.changePassword(passwordForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') this._router.navigate(['./home']);
          this.isLoading = false;
          this.toastr.success('Password changed successfully!', 'Success', {
            timeOut: 4000,
          });
          this.toastr.toastrConfig.timeOut = 4000;
        },

        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.errorMsg = err.error.errors.msg;
          this.toastr.error(`${this.errorMsg}`, 'Major Error', {});
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
