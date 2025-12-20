import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DefaultResponseType} from "../../../types/default-response.type";

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient) {
    }

    postComment(article: string, text: string): Observable<DefaultResponseType> {
        return this.http.post<DefaultResponseType>(environment.api + 'comments', {article, text}, {withCredentials: true})
    }
}
