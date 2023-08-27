import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Route, Router } from '@angular/router';
import { TokenService } from '../../../../services/token.service';
import {
  fadeInAnimation,
  fadeOutAnimation,
  fadeRightAnimation,
} from '../../.././../animations/animations';
import { fadeRoutingAnimations } from '../../../../animations/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeInAnimation, fadeOutAnimation, fadeRightAnimation],
})
export class LoginComponent {
  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
    private _tokenService: TokenService
  ) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  isLoading: boolean = false;
  errorMsg: string = '';

  handleLogin(loginForm: FormGroup) {
    this.isLoading = true;
    if (loginForm.valid) {
      this._authService.login(loginForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            this._router.navigate(['./pages/home']);
            localStorage.setItem('userToken', response.token);
            this._tokenService.decodeToken();
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMsg = err.error.message;
          this.isLoading = false;
        },

        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
