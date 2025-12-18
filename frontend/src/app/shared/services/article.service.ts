import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticleType} from "../../../types/article.type";
import {environment} from "../../../environments/environment";
import {ArticleListType} from "../../../types/article-list.type";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    constructor(private http: HttpClient) {
    }

    getPopularArticles(): Observable<ArticleType[]> {
        return this.http.get<ArticleType[]>(environment.api + 'articles/top')
    }

    getAllArticles(): Observable<ArticleListType> {
        return this.http.get<ArticleListType>(environment.api + 'articles')
    }
}
