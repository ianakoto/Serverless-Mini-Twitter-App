import { CommentUpdate } from "../models/CommentUpdate";


export interface CreateTweetRequest {
    tweetId: string
    userId: string
    createdAt: string
    like?: number
    comment?: Array<CommentUpdate>
    tweethandler: string
    attachmentUrl?: string
}