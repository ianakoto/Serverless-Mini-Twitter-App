import {  APIGatewayProxyEvent } from 'aws-lambda';
import * as uuid from 'uuid';
import { TweetAccess } from '../dataLayer/tweetAccess';
import { TweetItem } from '../models/TweetItem';
import { CreateTweetRequest } from '../requests/CreateTweetRequest';
import { UpdateTweet } from '../models/UpdateTweet';
import { CommentUpdate } from '../models/CommentUpdate';


const tweetAccess = new TweetAccess();


export async function getUserTweet(event:APIGatewayProxyEvent): Promise<TweetItem[]> {

    const userId = getUserId(event)
    
    return tweetAccess.getUserTweets(userId)
}


export async function createUserTweet(event:APIGatewayProxyEvent): Promise<TweetItem> {

    const newTweet: CreateTweetRequest = JSON.parse(event.body)
    const tweetId = uuid.v4();
    const userId = getUserId(event);
    const createdAt= new Date().toISOString()
  
    const addTweet = {
        userId: userId,
        tweetId: tweetId,
        createdAt:createdAt,
        ...newTweet
    } as TweetItem

    return tweetAccess.createUserTweet(addTweet)
}



export async function deleteUserTweet(event: APIGatewayProxyEvent) {
   
    const tweetId = event.pathParameters.tweetId
    const userId = getUserId(event);
    return tweetAccess.deleteUserTweet(userId,tweetId)
}

export async function updateUserTweet(event: APIGatewayProxyEvent) {
    const tweetId = event.pathParameters.tweetId
    const updatedTweet: UpdateTweet = JSON.parse(event.body)
    const userId = getUserId(event);


    return tweetAccess.updateTweetLike(userId,tweetId,updatedTweet)
}


export async function addTweetComment(event: APIGatewayProxyEvent) {
    const tweetId = event.pathParameters.tweetId
    const comment: CommentUpdate = JSON.parse(event.body)
    const userId = getUserId(event);  


    return tweetAccess.addTweetComments(userId,tweetId,comment)
}