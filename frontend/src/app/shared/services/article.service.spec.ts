import {ArticleService} from "./article.service";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {TestBed} from "@angular/core/testing";
import {environment} from "../../../environments/environment";

describe('Article Service', () => {
    let articleService: ArticleService
    let httpServiceSpy: jasmine.SpyObj<HttpClient>
    const article = {
        id: 'string',
        title: 'string',
        description: 'string',
        image: 'string',
        date: 'string',
        category: 'string',
        url: 'string'
    }

    beforeEach(() => {
        httpServiceSpy = jasmine.createSpyObj('HttpClient', ['get'])
        httpServiceSpy.get.and.returnValue(of([article]))

        TestBed.configureTestingModule({
            providers: [
                ArticleService,
                {provide: HttpClient, useValue: httpServiceSpy}
            ]
        })
        articleService = TestBed.inject(ArticleService)
    })

    it('should make http request for article data', (done: DoneFn) => {
        articleService.getPopularArticles().subscribe((result) => {
            expect(httpServiceSpy.get).toHaveBeenCalledOnceWith(environment.api + 'articles/top')
            expect(result).toEqual([article])
            done()
        })
    })
})
