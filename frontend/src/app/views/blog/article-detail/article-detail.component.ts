import {Component, OnInit} from '@angular/core';
import {ArticleDetailType} from "../../../../types/article-detail.type";
import {ArticleService} from "../../../shared/services/article.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CategoryService} from "../../../shared/services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleListType} from "../../../../types/article-list.type";
import {HttpErrorResponse} from "@angular/common/http";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";
import {ArticleType} from "../../../../types/article.type";
import {AuthService} from "../../../core/auth/auth.service";
import {CommentService} from "../../../shared/services/comment.service";
import {ModalTypeEnum} from "../../../../types/modal-type.enum";

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {
    serverStaticPath = environment.serverStaticPath
    article!: ArticleDetailType
    relatedArticles: ArticleType[] = []
    isLogged: boolean = false
    commentText: string | null = null

    constructor(
        private activatedRoute: ActivatedRoute,
        private articleService: ArticleService,
        private _snackBar: MatSnackBar,
        private sanitizer: DomSanitizer,
        private authService: AuthService,
        private commentService: CommentService,
        // private categoryService: CategoryService,
        // private router: Router,
    ) {
        this.isLogged = this.authService.isLogged
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.getArticle(params['url'])
            this.getRelatedArticles(params['url'])
        })
    }

    getArticle(url: string) {
        this.articleService.getArticle(url).subscribe({
            next: (result: ArticleDetailType | DefaultResponseType) => {
                if ((result as DefaultResponseType).error !== undefined) {
                    throw new Error((result as DefaultResponseType).message)
                }

                this.article = result as ArticleDetailType
            },
            error: (errorResponse: HttpErrorResponse) => {
                if (errorResponse.error && errorResponse.error.message) {
                    this._snackBar.open(errorResponse.error.message, 'Закрыть')
                } else {
                    this._snackBar.open('Ошибка получения статьи', 'Закрыть')
                }
            }
        })
    }

    getRelatedArticles(url: string) {
        this.articleService.getRelatedArticles(url).subscribe({
            next: (result: ArticleType[] | DefaultResponseType) => {
                if ((result as DefaultResponseType).error !== undefined) {
                    throw new Error((result as DefaultResponseType).message)
                }

                this.relatedArticles = result as ArticleType[]
            },
            error: (errorResponse: HttpErrorResponse) => {
                if (errorResponse.error && errorResponse.error.message) {
                    this._snackBar.open(errorResponse.error.message, 'Закрыть')
                } else {
                    this._snackBar.open('Ошибка получения связанных статей', 'Закрыть')
                }
            }
        })
    }

    safeHtml(text: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(text)
    }

    postComment(): void {
        if (!this.commentText) {return}

        this.commentService.postComment(this.article.id, this.commentText).subscribe({
            next: (result: DefaultResponseType) => {
                if (result.error) {
                    this._snackBar.open(result.message, 'Закрыть')
                    throw new Error(result.message)
                }
                this._snackBar.open('Комментарий добавлен', 'Закрыть')
            },
            error: (errorResponse: HttpErrorResponse) => {
                if (errorResponse.error && errorResponse.error.message) {
                    this._snackBar.open(errorResponse.error.message, 'Закрыть')
                } else {
                    this._snackBar.open('Ошибка отправки запроса. Попробуйте позднее', 'Закрыть')
                }
            }
        })
    }
}
