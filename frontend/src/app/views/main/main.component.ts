import {Component, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    carouselItems = [
        {
            label: 'Предложение месяца',
            title: 'Продвижение в Instagram для вашего бизнеса <span>-15%</span>!',
            text: '',
            image: 'carousel-1.png',
        },
        {
            label: 'Акция',
            title: 'Нужен грамотный <span>копирайтер</span>?',
            text: 'Весь декабрь у нас действует акция на работу копирайтера.',
            image: 'carousel-2.png',
        },
        {
            label: 'Новость дня',
            title: '<span>6 место</span> в ТОП-10<br> SMM-агенств Москвы!',
            text: 'Мы благодарим каждого, кто голосовал за нас!',
            image: 'carousel-3.png',
        },
    ]
    customOptions: OwlOptions = {
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

    constructor(private sanitizer: DomSanitizer) {
    }

    ngOnInit(): void {
    }

    safeTitle(text: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(text)
    }
}
