import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {UserService} from "../../services/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {UserType} from "../../../../types/user.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginResponseType} from "../../../../types/login-response.type";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isLogged: boolean = false
    userName: string | null = null

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private _snackBar: MatSnackBar,
        private router: Router,
        ) {
        this.isLogged = this.authService.isLogged
        this.userName = this.userService.userName
    }

    ngOnInit(): void {
        this.authService.isLogged$.subscribe((result: boolean) => {
            this.isLogged = result
        })

        this.userService.userName$.subscribe((result: string | null) => {
            if (result) {
                this.userName = result
            }
        })
    }

    logout(): void {
        this.authService.logout().subscribe({
            next: (() => {
                this.doLogout()
            }),
            error: () => {
                this.doLogout()
            }
        })
    }

    doLogout(): void {
        this.authService.removeTokens()
        this.authService.userId = null
        this.userService.userName = null
        this._snackBar.open('Вы вышли из системы', 'Закрыть')
        this.router.navigate(['/'])
    }
}
