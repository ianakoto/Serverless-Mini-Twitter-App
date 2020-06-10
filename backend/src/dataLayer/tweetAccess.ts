import * as AWSXRay from 'aws-xray-sdk'
import { createLogger } from '../utils/logger'
import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TweetItem } from '../models/TweetItem'
import { UpdateTweet } from '../models/UpdateTweet'

const logger = createLogger('createTodo')

const XAWS = AWSXRay.captureAWS(AWS)

export class TweetAccess {

    constructor(
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly  s3 = new XAWS.S3({ signatureVersion: 'v4'}),
        private readonly tweetTable = process.env.TWEET_TABLE,
        private readonly tweetTableIndex = process.env.TWEET_ID_INDEX,
        private readonly bucketName = process.env.IMAGES_S3_BUCKET,
        private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION

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
        logger.info(`tweet results: ${result.Items}`)
    
        return result.Items as TweetItem[]
}      



async createUserTweet(newTweet: TweetItem): Promise<TweetItem> {
    console.log('Storing new item: ', newTweet )
    await this.docClient.put({
     TableName: this.tweetTable,
     Item: newTweet
   }).promise()
   logger.info('Attempting to create Tweet')
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
    
      logger.info("Attempting a conditional update...")
      const updateItem = this.docClient.update(params).promise()
    
      return updateItem

}







}
