import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {LoginResponseType} from "../../../../types/login-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../../shared/services/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
    isShowPassword: boolean = false;
    signupForm = this.fb.group({
        name: ['', [Validators.required, Validators.pattern(/^([А-ЯЁ][а-яё]*(?:\s[А-ЯЁ][а-яё]*)*)$/)]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)]],
        agree: [false, [Validators.requiredTrue]],
    });

    get name() {return this.signupForm.get('name');}
    get email() {return this.signupForm.get('email');}
    get password() {return this.signupForm.get('password');}
    get agree() {return this.signupForm.get('agree');}

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private userService: UserService,
        ) {
    }

    signup(): void {
        if (this.signupForm.invalid || !this.name?.value || !this.email?.value || !this.password?.value || !this.agree?.value) {return;}

        this.authService.signup(this.name.value, this.email.value, this.password.value).subscribe({
            next: (result: DefaultResponseType | LoginResponseType) => {
                const loginResponse: LoginResponseType = result as LoginResponseType;
                let error: string | null = null;
                if ((result as DefaultResponseType).error !== undefined) {
                    error = (result as DefaultResponseType).message;
                }
                if (!loginResponse.accessToken || !loginResponse.refreshToken || !loginResponse.userId) {
                    error = 'Ошибка авторизации';
                }

                if (error) {
                    this._snackBar.open(error, 'Закрыть');
                    throw new Error(error);
                }

                this.authService.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
                this.authService.userId = loginResponse.userId;
                this.userService.userName = this.name!.value;
                this._snackBar.open('Вы успешно зарегистрировались!', 'Закрыть');
                this.router.navigate(['/']);
            },
            error: (errorResponse: HttpErrorResponse) => {
                if (errorResponse.error && errorResponse.error.message) {
                    this._snackBar.open(errorResponse.error.message, 'Закрыть');
                } else {
                    this._snackBar.open('Ошибка регистрации', 'Закрыть');
                }
            },
        });
    }

    togglePassword(): void {
        this.isShowPassword = !this.isShowPassword;
    }
}
