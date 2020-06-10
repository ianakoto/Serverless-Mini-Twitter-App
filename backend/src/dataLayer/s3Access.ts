import * as AWSXRay from 'aws-xray-sdk'
import { createLogger } from '../utils/logger'
import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TweetItem } from '../models/TweetItem'
import { UpdateTweet } from '../models/UpdateTweet'
import { CommentUpdate } from '../models/CommentUpdate'

const logger = createLogger('createTodo')

const XAWS = AWSXRay.captureAWS(AWS)


export class S3Access {

    constructor(
        private readonly  s3 = new XAWS.S3({ signatureVersion: 'v4'}),
        private readonly bucketName = process.env.IMAGES_S3_BUCKET,
        private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION
        ) {}





        
}