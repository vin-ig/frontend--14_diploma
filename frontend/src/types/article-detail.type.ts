import {CommentType} from "./comment.type";
import {SafeHtml} from "@angular/platform-browser";

export type ArticleDetailType = {
    id: string,
    title: string,
    description: string,
    text: string,
    image: string,
    date: string,
    category: string,
    url: string,
    commentsCount: number,
    comments: CommentType[],
}
