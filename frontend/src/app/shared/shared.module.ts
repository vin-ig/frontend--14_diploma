import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from './components/modal/modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ArticleCardComponent } from './components/article-card/article-card.component';
import {RouterModule} from "@angular/router";
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
    declarations: [
        ModalComponent,
        ArticleCardComponent,
        LoaderComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule
    ],
    exports: [
        ModalComponent,
        ArticleCardComponent,
        LoaderComponent,
    ]
})
export class SharedModule {
}
