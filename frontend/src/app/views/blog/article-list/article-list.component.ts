import {Component, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {ArticleService} from "../../../shared/services/article.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ArticleListType} from "../../../../types/article-list.type";
import {CategoryType} from "../../../../types/category.type";
import {CategoryService} from "../../../shared/services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveParamsType} from "../../../../types/active-params.type";

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
    readonly articlesRoute = '/articles'
    pages: number = 0
    count: number = 0
    articles: ArticleType[] = []
    openFilter: boolean = false
    categories: CategoryType[] = []
    categoriesInFilter: CategoryType[] = []
    activeParams: ActiveParamsType = {categories: []}

    constructor(
        private articleService: ArticleService,
        private _snackBar: MatSnackBar,
        private categoryService: CategoryService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.initPage()
    }

    initPage(): void {
        this.categoryService.getCategories().subscribe({
            next: (result: CategoryType[]) => {
                this.categories = result
                this.setActiveParamsFromUrl()
                this.updateFilter()
                this.updateArticles()
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

    toggleFilterMenu() {
        this.openFilter = !this.openFilter
    }

    processFiler(category: CategoryType) {
        const currentCategoryInFilter = this.categoriesInFilter.find(item => item.id === category.id)
        if (currentCategoryInFilter) {
            category.isInFilter = false
            this.categoriesInFilter = this.categoriesInFilter.filter(item => item.id !== category.id)
        } else {
            category.isInFilter = true
            this.categoriesInFilter.push(category)
        }

        delete this.activeParams.page
        this.updateUrlParams()
        this.updateArticles()
    }

    updateUrlParams() {
        this.activeParams.categories = this.categoriesInFilter.map(item => item.url)
        this.router.navigate([this.articlesRoute], {queryParams: this.activeParams})
    }

    updateArticles() {
        this.articleService.getAllArticles(this.activeParams).subscribe({
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
    }

    setActiveParamsFromUrl() {
        this.activatedRoute.queryParams
            .subscribe(params => {
                this.activeParams = {categories: []}
                if (params.hasOwnProperty('categories')) {
                    const parCategories = params['categories']
                    this.activeParams.categories = Array.isArray(parCategories) ? parCategories : [parCategories]
                }
                if (params.hasOwnProperty('page')) {this.activeParams.page = +params['page']}
            })
    }

    updateFilter() {
        this.categoriesInFilter = []
        this.categories.forEach(item => {
            if (this.activeParams.categories.includes(item.url)) {
                item.isInFilter = true
                this.categoriesInFilter.push(item)
            }
        })
    }


    openPage(page: number): void {
        if (!this.activeParams.page && page == 1 || this.activeParams.page === page) {
            return
        }

        this.activeParams.page = page
        this.router.navigate([this.articlesRoute], {queryParams: this.activeParams})
        this.initPage()
    }

    openPrevPage(): void {
        if (this.activeParams.page && this.activeParams.page > 1) {
            this.activeParams.page--
            this.router.navigate([this.articlesRoute], {queryParams: this.activeParams})
        }
        this.initPage()
    }

    openNextPage(): void {
        if (this.activeParams.page === this.pages) {
            return
        }

        if (!this.activeParams.page && this.pages > 1) {
            this.activeParams.page = 2
        } else if (this.activeParams.page && this.activeParams.page < this.pages) {
            this.activeParams.page++
        }

        this.router.navigate([this.articlesRoute], {queryParams: this.activeParams})
        this.initPage()
    }
}
