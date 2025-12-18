import {Component, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {ArticleService} from "../../../shared/services/article.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {ModalTypeEnum} from "../../../../types/modal-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ArticleListType} from "../../../../types/article-list.type";
import {CategoryType} from "../../../../types/category.type";
import {CategoryService} from "../../../shared/services/category.service";

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
    pages: number = 0
    count: number = 0
    articles: ArticleType[] = []
    openFilter: boolean = false
    categories: CategoryType[] = []

    constructor(
        private articleService: ArticleService,
        private _snackBar: MatSnackBar,
        private categoryService: CategoryService,
    ) {
    }

    ngOnInit(): void {
        this.articleService.getAllArticles().subscribe({
            next: (result: ArticleListType) => {
                this.count = result.count
                this.pages = result.pages
                this.articles = result.items
            },
            error: (errorResponse: HttpErrorResponse) => {
                if (errorResponse.error && errorResponse.error.message) {
                    this._snackBar.open(errorResponse.error.message, 'Закрыть')
                } else {
                    this._snackBar.open('Ошибка получения статей', 'Закрыть')
                }
            }

        })

        this.categoryService.getCategories().subscribe({
            next: (result: CategoryType[]) => {
                this.categories = result
            },
            error: (errorResponse: HttpErrorResponse) => {
                if (errorResponse.error && errorResponse.error.message) {
                    this._snackBar.open(errorResponse.error.message, 'Закрыть')
                } else {
                    this._snackBar.open('Ошибка получения категорий', 'Закрыть')
                }
            }
        })
    }

    toggleFilter() {
        this.openFilter = !this.openFilter
    }
}
