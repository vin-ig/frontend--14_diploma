import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {OwlOptions} from "ngx-owl-carousel-o";
import {ArticleService} from "../../shared/services/article.service";
import {ArticleType} from "../../../types/article.type";
import {HttpErrorResponse} from "@angular/common/http";
import {StaticData} from "./static-data";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    carouselItems = StaticData.carouselItems
    services = StaticData.services
    reviews = StaticData.reviews

    bannerOptions: OwlOptions = {
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        dots: true,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1
            },
        },
    }
    reviewsOptions: OwlOptions = {
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false,
        margin: 25,
        navSpeed: 700,
        dots: false,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            740: {
                items: 3
            },
            940: {
                items: 3
            }
        },
    }

    popularArticles: ArticleType[] = []

    constructor(
        private sanitizer: DomSanitizer,
        private articleService: ArticleService,
    ) {
    }

    ngOnInit(): void {
        this.articleService.getPopularArticles().subscribe({
            next: (result: ArticleType[]) => {
                this.popularArticles = result
            },
            error: (errorResponse: HttpErrorResponse) => {
                if (errorResponse.error && errorResponse.error.message) {
                    console.log(errorResponse.error.message)
                } else {
                    console.log('Ошибка получения популярных статей')
                }
            },
        })
    }

    safeTitle(text: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(text)
    }

    serviceRequest(serviceName: string) {

    }
}
