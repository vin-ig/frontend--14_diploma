import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { MainComponent } from './views/main/main.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from "@angular/material/menu";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
        MainComponent,
        LayoutComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        MatMenuModule,
        AppRoutingModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
