import {of} from "rxjs";
import {CommentComponent} from "./comment.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CommentType} from "../../../../types/comment.type";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentService} from "../../../shared/services/comment.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {CommentActionEnum} from "../../../../types/comment-action.enum";

describe('Comment Component', () => {
    let commentComponent: CommentComponent
    let fixture: ComponentFixture<CommentComponent>
    let comment: CommentType
    const defaultLikesCount = 89
    const defaultDislikesCount = 89

    beforeEach(() => {
        const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLogged'], {isLogged$: of(true)})
        const _snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open'])
        const commentServiceSpy = jasmine.createSpyObj('CommentService', ['applyAction'])

        TestBed.configureTestingModule({
            declarations: [CommentComponent],
            providers: [
                {provide: AuthService, useValue: authServiceSpy},
                {provide: MatSnackBar, useValue: _snackBarSpy},
                {provide: CommentService, useValue: commentServiceSpy},
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
        fixture = TestBed.createComponent(CommentComponent)
        commentComponent = fixture.componentInstance
        comment = {
            id: 'string',
            text: 'string',
            date: '2023-01-20T02:54:32.543Z',
            likesCount: defaultLikesCount,
            dislikesCount: defaultDislikesCount,
            user: {
                id: 'string',
                name: 'string',
            },
        }

        commentComponent.comment = comment
    })

    it('should set new value from parent component', () => {
        commentComponent.comment.likesCount = 5
        fixture.detectChanges()
        expect(commentComponent.comment.likesCount).toBe(5)
    })

    it('should be visible user reaction', () => {
        const componentElement: HTMLElement = fixture.nativeElement
        const likeSvgElement: HTMLElement | null = componentElement.querySelector('.comment-footer-item:first-child svg')
        let computedStyle = window.getComputedStyle(likeSvgElement!).stroke

        expect(computedStyle).toBe('rgb(7, 23, 57)')

        commentComponent.comment.actionForUser = CommentActionEnum.like
        fixture.detectChanges()
        computedStyle = window.getComputedStyle(likeSvgElement!).stroke

        expect(computedStyle).toBe('rgb(112, 159, 220)')
    })

    it('should be applied acton', () => {
        let commentServiceSpy = TestBed.inject(CommentService) as jasmine.SpyObj<CommentService>
        commentServiceSpy.applyAction.and.returnValue(of({error: false, message: 'ok'}))

        // Пока нет реакций
        expect(commentComponent.comment.actionForUser).toBeUndefined()
        expect(commentComponent.comment.likesCount).toBe(defaultLikesCount)
        expect(commentComponent.comment.likesCount).toBe(defaultDislikesCount)

        // Ставим лайк
        commentComponent.applyAction(CommentActionEnum.like)
        expect(commentComponent.comment.actionForUser).toBe(CommentActionEnum.like)
        expect(commentComponent.comment.likesCount).toBe(defaultLikesCount + 1)
        expect(commentComponent.comment.dislikesCount).toBe(defaultDislikesCount)

        // Ставим дизлайк
        commentComponent.applyAction(CommentActionEnum.dislike)
        expect(commentComponent.comment.actionForUser).toBe(CommentActionEnum.dislike)
        expect(commentComponent.comment.likesCount).toBe(defaultLikesCount)
        expect(commentComponent.comment.dislikesCount).toBe(defaultDislikesCount + 1)

        // Снимаем дизлайк
        commentComponent.applyAction(CommentActionEnum.dislike)
        expect(commentComponent.comment.actionForUser).toBeUndefined()
        expect(commentComponent.comment.likesCount).toBe(defaultLikesCount)
        expect(commentComponent.comment.dislikesCount).toBe(defaultDislikesCount)
    })
})
