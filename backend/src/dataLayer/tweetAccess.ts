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




}