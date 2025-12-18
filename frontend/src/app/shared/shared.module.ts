import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalComponent} from './components/modal/modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ArticleCardComponent } from './components/article-card/article-card.component';


@NgModule({
    declarations: [
        ModalComponent,
        ArticleCardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        ModalComponent,
        ArticleCardComponent,
    ]
})
export class SharedModule {
}
