import { CommentUpdate } from "./CommentUpdate";

export interface RetweetItem {
    comment?: Array<CommentUpdate>
    tweethandler: string
    attachmentUrl?: string
}