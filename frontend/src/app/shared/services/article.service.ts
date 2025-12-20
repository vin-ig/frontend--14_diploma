import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ArticleType} from "../../../types/article.type";
import {environment} from "../../../environments/environment";
import {ArticleListType} from "../../../types/article-list.type";
import {ActiveParamsType} from "../../../types/active-params.type";
import {ArticleDetailType} from "../../../types/article-detail.type";
import {DefaultResponseType} from "../../../types/default-response.type";

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    constructor(private http: HttpClient) {
    }

    getPopularArticles(): Observable<ArticleType[]> {
        return this.http.get<ArticleType[]>(environment.api + 'articles/top')
    }

    getAllArticles(params: ActiveParamsType): Observable<ArticleListType> {
        return this.http.get<ArticleListType>(environment.api + 'articles', {params: params})
    }

    getArticle(url: string): Observable<ArticleDetailType | DefaultResponseType> {
        return this.http.get<ArticleDetailType | DefaultResponseType>(environment.api + 'articles/' + url)
    }

    getRelatedArticles(url: string): Observable<ArticleType[] | DefaultResponseType> {
        return this.http.get<ArticleType[] | DefaultResponseType>(environment.api + 'articles/related/' + url)
    }
}
