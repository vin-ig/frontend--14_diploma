import {Component, ElementRef, HostListener, Input, OnInit, Renderer2, TemplateRef, ViewChild} from '@angular/core';
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
    styleUrls: ['./header.component.scss', './header-adaptive.component.scss']
})
export class HeaderComponent implements OnInit {
    isLogged: boolean = false;
    userName: string | null = null;

    @ViewChild('headerMenu') headerMenu!: ElementRef
    @ViewChild('headerContacts') headerContacts!: ElementRef
    isOpenMenu: boolean = false

    constructor(
        private authService: AuthService,
        private userService: UserService,
        private _snackBar: MatSnackBar,
        private router: Router,
        private rend: Renderer2,
        ) {
        this.isLogged = this.authService.isLogged;
        this.userName = this.userService.userName;
    }

    ngOnInit(): void {
        this.authService.isLogged$.subscribe((result: boolean) => {
            this.isLogged = result;
        });

        this.userService.userName$.subscribe((result: string | null) => {
            if (result) {
                this.userName = result;
            }
        });
    }

    logout(): void {
        this.authService.logout().subscribe({
            next: (() => {
                this.doLogout();
            }),
            error: () => {
                this.doLogout();
            }
        });
    }

    doLogout(): void {
        this.authService.removeTokens();
        this.authService.userId = null;
        this.userService.userName = null;
        this._snackBar.open('Вы вышли из системы', 'Закрыть');
        this.router.navigate(['/']);
    }

    toggleMenu(event?: MouseEvent): void {
        if (event) {
            event.stopPropagation();
        }

        if (this.isOpenMenu) {
            this.isOpenMenu = false
            this.rend.setStyle(this.headerMenu.nativeElement, 'display', 'none')
        } else {
            const li = this.rend.createElement('li')
            const headerContacts = this.headerContacts.nativeElement
            const menuUl = this.headerMenu.nativeElement.querySelector('ul')
            if (!menuUl.querySelector('li .header-contacts')) {
                this.rend.appendChild(li, this.headerContacts.nativeElement);
                this.rend.appendChild(menuUl, li)
            }

            this.rend.setStyle(this.headerMenu.nativeElement, 'display', 'block')
            this.rend.setStyle(headerContacts, 'display', 'block')
            this.isOpenMenu = true
        }
    }

    @HostListener('document:click')
    click() {
        if (this.isOpenMenu) {
            this.toggleMenu()
        }
    }
}
