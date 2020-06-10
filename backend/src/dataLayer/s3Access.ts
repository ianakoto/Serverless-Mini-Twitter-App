import * as AWSXRay from 'aws-xray-sdk'
import { createLogger } from '../utils/logger'
import * as AWS from 'aws-sdk'
import { TweetAccess } from './tweetAccess'

const logger = createLogger('createTodo')

const XAWS = AWSXRay.captureAWS(AWS)

const tweetAccess = new TweetAccess()
export class S3Access {

    constructor(
        private readonly  s3 = new XAWS.S3({ signatureVersion: 'v4'}),
        private readonly bucketName = process.env.IMAGES_S3_BUCKET,
        private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION
        ) {}





    async generateUserUploadUrl(userId:string, tweetId: string, attachmentId: string) {

        const url= this.s3.getSignedUrl('putObject',{
                Bucket: this.bucketName,
                Key: attachmentId,
                Expires: this.urlExpiration
                })
    
        logger.info(`signed url:,${url}`);
    
        const imageUrl = `https://${this.bucketName}.s3.amazonaws.com/${attachmentId}`
    
        logger.info(`Attempting to Updating attachmentUrl: ${imageUrl} with attachmentID:${attachmentId} on tweetId:${tweetId} and userId::${userId} `)
    
        await tweetAccess.uploadImageUrl(imageUrl,userId,tweetId)



    
        return url
    
        }





}