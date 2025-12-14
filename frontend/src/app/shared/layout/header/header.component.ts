import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isLogged: boolean = false

    constructor(
        private authService: AuthService,
        ) {
        this.isLogged = this.authService.isLogged
    }

    ngOnInit(): void {
        this.authService.isLogged$.subscribe((result: boolean) => {
            this.isLogged = result
        })
    }

    logout(): void {
    }

}
