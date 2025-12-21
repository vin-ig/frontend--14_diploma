import {Component, Input, OnInit} from '@angular/core';
import {CommentType} from "../../../../types/comment.type";
import {CommentActionEnum} from "../../../../types/comment-action.enum";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../core/auth/auth.service";
import {CommentService} from "../../../shared/services/comment.service";

@Component({
    selector: 'comment-component',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
    @Input() comment!: CommentType
    isLogged: boolean = false
    actionTypes = CommentActionEnum
    isViolate: boolean = false

    constructor(
        private authService: AuthService,
        private _snackBar: MatSnackBar,
        private commentService: CommentService,
    ) {
        this.isLogged = this.authService.isLogged
    }

    ngOnInit(): void {
    }

    applyAction(actionType: CommentActionEnum) {
        if (!this.isLogged) {
            this._snackBar.open('Чтобы поставить оценку, нужно зарегистрироваться', 'Закрыть')
            return
        }

        if (actionType === CommentActionEnum.violate && this.isViolate) {
            this._snackBar.open('Жалоба уже отправлена', 'Закрыть')
            return
        }

        this.commentService.applyAction(this.comment.id, actionType).subscribe({
            next: (result: DefaultResponseType) => {
                if (result.error) {
                    this._snackBar.open(result.message, 'Закрыть')
                    throw new Error(result.message)
                }

                const oldStatus = this.comment.actionForUser
                this.comment.actionForUser = actionType

                switch (actionType) {
                    case CommentActionEnum.violate:
                        this.isViolate = true
                        this._snackBar.open('Жалоба отправлена', 'Закрыть')
                        return
                    case CommentActionEnum.like:
                        if (oldStatus) {
                            if (oldStatus === actionType) {
                                this.comment.likesCount--
                                this.comment.actionForUser = undefined
                            } else {
                                this.comment.likesCount++
                                this.comment.dislikesCount--
                            }
                        } else {
                            this.comment.likesCount++
                        }
                        break
                    case CommentActionEnum.dislike:
                        if (oldStatus) {
                            if (oldStatus === actionType) {
                                this.comment.dislikesCount--
                                this.comment.actionForUser = undefined
                            } else {
                                this.comment.likesCount--
                                this.comment.dislikesCount++
                            }
                        } else {
                            this.comment.dislikesCount++
                        }
                        break
                }

                this._snackBar.open('Ваш голос учтен!', 'Закрыть')
            },
            error: (errorResponse: HttpErrorResponse) => {
                if (errorResponse.error && errorResponse.error.message) {
                    this._snackBar.open(errorResponse.error.message, 'Закрыть')
                } else {
                    this._snackBar.open('Ошибка отправки запроса. Попробуйте позднее', 'Закрыть')
                }
            }
        })
    }
}
