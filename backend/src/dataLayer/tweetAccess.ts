import * as AWSXRay from 'aws-xray-sdk'
import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TweetItem } from '../models/TweetItem'
import { UpdateTweet } from '../models/UpdateTweet'
import { CommentUpdate } from '../models/CommentUpdate'



const XAWS = AWSXRay.captureAWS(AWS)

export class TweetAccess {

    constructor(
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly tweetTable = process.env.TWEET_TABLE,
        private readonly tweetTableIndex = process.env.TWEET_ID_INDEX,

        ) {}


    async getUserTweets(userId: String): Promise<TweetItem[]> {
        const result =  await this.docClient.query({
            TableName: this.tweetTable,
            IndexName: this.tweetTableIndex,
            KeyConditionExpression: ' userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
            }).promise()
        console.info(`tweet results: ${result.Items}`)
    
        return result.Items as TweetItem[]
    }  


    async reTweet(item:TweetItem) {
        
        console.info('Storing retweet item: ', item )
        await this.docClient.put({
            TableName: this.tweetTable,
            Item: item
        }).promise()
        console.info('Attempting to create Tweet')
        return item

    }




    async createUserTweet(newTweet: TweetItem): Promise<TweetItem> {
        console.log('Storing new item: ', newTweet )
        await this.docClient.put({
        TableName: this.tweetTable,
        Item: newTweet}).promise()
        console.info('Attempting to create Tweet')
        return newTweet
    }





    async updateTweetLike(userId:string, tweetId: string, addLike: UpdateTweet) {

        var params = {
            TableName: this.tweetTable,
            Key:{
            "userId": userId,
            "tweetId": tweetId
            },
            UpdateExpression: "set like=:like",
            ExpressionAttributeValues:{
                ":like":addLike.like
            },
            ReturnValues:"UPDATED_NEW"
        };
        
        console.info("Attempting a conditional update...")
        const updateItem = this.docClient.update(params).promise()
        
        return updateItem

    }



    async addTweetComments (userId:string, tweetId: string, comment: CommentUpdate) {

        var params = {
            TableName: this.tweetTable,
            Key:{
            "userId": userId,
            "tweetId": tweetId
            },
            UpdateExpression: "add comment =:comment",
            ExpressionAttributeValues:{
                ":comment": comment
            },
            ReturnValues:"UPDATED_NEW"
        };
        
        console.info("Attempting a conditional update...")
        const updateItem = this.docClient.update(params).promise()
        
        return updateItem

    }



    async deleteUserTweet(userId:string, todoId: string) {
        var params = {
            TableName: this.tweetTable,
            Key:{
            "userId": userId,
            "todoId": todoId
            }
        };
        
        console.info("Attempting a conditional delete...");
        
        const deleteItem = this.docClient.delete(params).promise()
        
        return deleteItem
    }



    async uploadImageUrl(imageUrl,userId,tweetId) {

        const params ={
            TableName: this.tweetTable,
            Key: {
                "userId": userId,
                "tweetId": tweetId
            },
            UpdateExpression: "set attachmentUrl = :attachmentUrl",
            ExpressionAttributeValues: {
                ":attachmentUrl": imageUrl
            },
            ReturnValues:"UPDATED_NEW"
        }
        await this.docClient.update(params, function(err, data) {
            if (err) {
            console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
            console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            }
        })
    }










}
