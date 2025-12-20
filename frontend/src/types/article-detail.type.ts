import {CommentType} from "./comment.type";

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
