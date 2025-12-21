import {CommentActionEnum} from "./comment-action.enum";

export type CommentType = {
    id: string,
    text: string,
    date: string,
    likesCount: number,
    dislikesCount: number,
    user: {
        id: string,
        name: string,
    },
    actionForUser?: CommentActionEnum,
}
