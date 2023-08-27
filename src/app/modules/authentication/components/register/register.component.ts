import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Route, Router } from '@angular/router';
import {
  fadeInAnimation,
  fadeOutAnimation,
  fadeRightAnimation,
} from '../../../../animations/animations';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [fadeInAnimation, fadeOutAnimation, fadeRightAnimation],
})
export class RegisterComponent implements OnInit {
  constructor(
    private _authSerive: AuthenticationService,
    private _router: Router,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = formBuilder.group(
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
          [Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)],
        ],
        rePassword: [
          null,
          [Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)],
        ],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
        usePassword: [true],
        passportNum: [null],
        rePassportNum: [null],
        permissions: this.formBuilder.array([]),
      },
      {
        validators: [
          this.passwordMatchValidator('password', 'rePassword'),
          this.passwordMatchValidator('passportNum', 'rePassportNum'),
        ],
      }
    );
  }
  ngOnInit(): void {
    console.log(this.permissions);

    this.permissionsArray.forEach((label) => {
      const permissionControl = this.formBuilder.control(false);
      this.permissions.push(permissionControl);
    });

    this.registerForm.get('usePassword')?.valueChanges.subscribe((value) => {
      this.handleRequiredControls(value);
    });
  }

  isLoading: boolean = false;
  errorMsg: string = '';
  registerForm: FormGroup = new FormGroup({});

  handleRegister(registerForm: FormGroup) {
    console.log(registerForm.value);

    if (registerForm.valid) {
      this.isLoading = true;
      this._authSerive.registerUser(registerForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success')
            this._router.navigate(['./authentication/login']);
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

  permissionsArray: string[] = [
    'Show products',
    'Add to Cart',
    'Checkout via credit card',
    'Remove Product from Database',
    'Add product to Database',
    'Update product',
  ];

  get permissions() {
    return this.registerForm.controls['permissions'] as FormArray;
  }

  handleRequiredControls(usePassword: boolean): void {
    const passwordControl = this.registerForm.get('password');
    const rePasswordControl = this.registerForm.get('rePassword');
    const passportControl = this.registerForm.get('passportNum');
    const rePassportControl = this.registerForm.get('rePassportNum');

    if (usePassword) {
      passwordControl?.addValidators([Validators.required]);
      rePasswordControl?.setValidators([Validators.required]);
      passportControl?.setValue(null);
      rePassportControl?.setValue(null);

      passportControl?.removeValidators([Validators.required]);
      rePassportControl?.removeValidators([Validators.required]);
    } else {
      passwordControl?.removeValidators([Validators.required]);
      rePasswordControl?.removeValidators([Validators.required]);
      passwordControl?.setValue(null);
      rePasswordControl?.setValue(null);

      passportControl?.addValidators([Validators.required]);
      rePassportControl?.setValidators([Validators.required]);
    }
    passwordControl?.updateValueAndValidity();
    rePasswordControl?.updateValueAndValidity();
    passportControl?.updateValueAndValidity();
    rePassportControl?.updateValueAndValidity();
  }
}
