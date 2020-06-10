import { CommentUpdate } from "./CommentUpdate";

export interface TweetItem {
    tweetId: string
    userId: string
    createdAt: string
    like: number
    comment: Array<CommentUpdate>
    tweethandler: string
    attachmentUrl?: string
}