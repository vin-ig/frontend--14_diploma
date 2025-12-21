import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserType} from "../../../types/user.type";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    readonly userNameKey = 'userName';
    userName$: Subject<string | null> = new Subject<string | null>();

    constructor(private http: HttpClient) {
    }

    getUserInfo(): Observable<DefaultResponseType | UserType> {
        return this.http.get<DefaultResponseType | UserType>(environment.api + 'users');
    }

    get userName(): string | null {return localStorage.getItem(this.userNameKey);}

    set userName(name: string | null) {
        if (name) {
            localStorage.setItem(this.userNameKey, name);
            this.userName$.next(name);
        } else {
            localStorage.removeItem(this.userNameKey);
            this.userName$.next(null);
        }
    }
}
