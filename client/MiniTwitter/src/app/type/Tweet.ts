
export interface Tweet {
    tweetId: string;
    userId: string;
    createdAt: string;
    like?: number;
    comment?: string;
    tweethandler: string;
    attachmentUrl?: string;
}
