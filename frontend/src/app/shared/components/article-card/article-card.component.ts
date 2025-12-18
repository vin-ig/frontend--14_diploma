import {Component, Input, OnInit} from '@angular/core';
import {ArticleType} from "../../../../types/article.type";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'article-card',
    templateUrl: './article-card.component.html',
    styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent implements OnInit {
    serverStaticPath = environment.serverStaticPath
    @Input() article!: ArticleType

    constructor() {
    }

    ngOnInit(): void {
    }

}
