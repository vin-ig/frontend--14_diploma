import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {LoginResponseType} from "../../../../types/login-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../../shared/services/user.service";
import {UserType} from "../../../../types/user.type";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    isShowPassword: boolean = false;

    loginForm = this.fb.group({
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required]],
        rememberMe: [false],
    });

    get email() {return this.loginForm.get('email');}
    get password() {return this.loginForm.get('password');}
    get rememberMe() {return this.loginForm.get('rememberMe');}

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private userService: UserService,
        ) {
    }

    login(): void {
        if (this.loginForm.invalid || !this.email?.value || !this.password?.value) {return;}

        this.authService.login(this.email.value, this.password.value, !!this.rememberMe?.value).subscribe({
            next: (result: DefaultResponseType | LoginResponseType) => {
                let error: string | null = null;
                if ((result as DefaultResponseType).error !== undefined) {
                    error = (result as DefaultResponseType).message;
                }

                const loginResponse: LoginResponseType = result as LoginResponseType;
                if (!loginResponse.accessToken || !loginResponse.refreshToken || !loginResponse.userId) {
                    error = 'Ошибка авторизации';
                }

                if (error) {
                    this._snackBar.open(error, 'Закрыть');
                    throw new Error(error);
                }

                this.authService.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
                this.authService.userId = loginResponse.userId;
                this.authService.userId = loginResponse.userId;
                this.getUserInfo();
                this._snackBar.open('Вы успешно авторизовались!', 'Закрыть');
                this.router.navigate(['/']);
            },
            error: (errorResponse: HttpErrorResponse) => {
                if (errorResponse.error && errorResponse.error.message) {
                    this._snackBar.open(errorResponse.error.message, 'Закрыть');
                } else {
                    this._snackBar.open('Ошибка авторизации', 'Закрыть');
                }
            },
        });
    }

    getUserInfo(): void {
        this.userService.getUserInfo().subscribe({
            next: (result: DefaultResponseType | UserType) => {
                let error: string | null = null;
                if ((result as DefaultResponseType).error !== undefined) {
                    error = (result as DefaultResponseType).message;
                }

                const userResponse: UserType = result as UserType;
                if (!userResponse.name || !userResponse.email || !userResponse.id) {
                    error = 'Ошибка поиска пользователя';
                }

                if (error) {
                    throw new Error(error);
                }

                this.userService.userName = userResponse.name;
            },
            error: (errorResponse: HttpErrorResponse) => {
                if (errorResponse.error && errorResponse.error.message) {
                    console.log(errorResponse.error.message);
                } else {
                    console.log('Ошибка поиска пользователя');
                }
            }
        });
    }

    togglePassword(): void {
        this.isShowPassword = !this.isShowPassword;
    }
}
