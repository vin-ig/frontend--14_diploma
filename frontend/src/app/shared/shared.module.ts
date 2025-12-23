import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from './components/modal/modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ArticleCardComponent } from './components/article-card/article-card.component';
import {RouterModule} from "@angular/router";
import { LoaderComponent } from './components/loader/loader.component';
import {NgxMaskModule} from "ngx-mask";
import { SafeHtmlPipe } from './pipes/safe-html.pipe';


@NgModule({
    declarations: [
        ModalComponent,
        ArticleCardComponent,
        LoaderComponent,
        SafeHtmlPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
    ],
    exports: [
        ModalComponent,
        ArticleCardComponent,
        LoaderComponent,
        SafeHtmlPipe,
    ]
})
export class SharedModule {
}
