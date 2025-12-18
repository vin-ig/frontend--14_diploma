import {ArticleType} from "./article.type";

export type ArticleListType = {
    count: number,
    pages: number,
    items: ArticleType[],
}
