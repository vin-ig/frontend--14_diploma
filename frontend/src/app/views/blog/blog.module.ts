import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BlogRoutingModule} from './blog-routing.module';
import {ArticleListComponent} from './article-list/article-list.component';
import {ArticleDetailComponent} from './article-detail/article-detail.component';
import {SharedModule} from "../../shared/shared.module";
import { CommentComponent } from './comment/comment.component';
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        ArticleListComponent,
        ArticleDetailComponent,
        CommentComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        BlogRoutingModule
    ]
})
export class BlogModule {
}
