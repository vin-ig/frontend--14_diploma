import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DefaultResponseType} from "../../../types/default-response.type";
import {CommentsType} from "../../../types/comments.type";
import {CommentActionEnum} from "../../../types/comment-action.enum";
import {ActionForCommentType} from "../../../types/action-for-comment.type";

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private http: HttpClient) {
    }

    postComment(article: string, text: string): Observable<DefaultResponseType> {
        return this.http.post<DefaultResponseType>(environment.api + 'comments', {article, text}, {withCredentials: true});
    }

    getComments(article:string, offset: number): Observable<CommentsType | DefaultResponseType> {
        return this.http.get<CommentsType | DefaultResponseType>(environment.api + 'comments', {params: {article, offset}});
    }

    applyAction(commentId: string, action: CommentActionEnum): Observable<DefaultResponseType> {
        return this.http.post<DefaultResponseType>(environment.api + 'comments/' + commentId + '/apply-action', {action}, {withCredentials: true});
    }

    getActionsForComment(commentId:string): Observable<ActionForCommentType[] | DefaultResponseType> {
        return this.http.get<ActionForCommentType[] | DefaultResponseType>(environment.api + 'comments/' + commentId + '/actions', {withCredentials: true});
    }

    getActionsForAllComments(articleId: string): Observable<ActionForCommentType[] | DefaultResponseType> {
        return this.http.get<ActionForCommentType[] | DefaultResponseType>(environment.api + 'comments/article-comment-actions', {params: {articleId}, withCredentials: true});
    }
}
