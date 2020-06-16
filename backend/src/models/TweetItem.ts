import { CommentUpdate } from "./CommentUpdate";


export interface TweetItem {
    tweetId: string
    userId: string
    createdAt: string
    like?: number
    comment?: string,
    commentList?: Array<CommentUpdate>,
    tweethandler: string
    attachmentUrl?: string
}