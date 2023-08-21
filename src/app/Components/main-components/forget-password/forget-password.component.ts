import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  constructor(
    private _authService: AuthenticationService,
    private _router: Router
  ) {}

  resetForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  verifyCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [Validators.required]),
  });

  isLoading: boolean = false;
  isRequested: boolean = false;
  errorMsg: string = '';
  isCodeSentLoading: boolean = false;

  handleReset(resetForm: FormGroup) {
    this.isLoading = true;

    if (resetForm.valid) {
      this._authService.forgetPassword(resetForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            // this._router.navigate(['./home']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.errorMsg = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
  handleCodeForm(resetForm: FormGroup) {
    this.isLoading = true;

    if (resetForm.valid) {
      this._authService.forgetPassword(resetForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            this._router.navigate(['./login']);
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.errorMsg = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}
