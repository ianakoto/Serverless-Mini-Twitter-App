import * as AWSXRay from 'aws-xray-sdk'
import * as AWS from 'aws-sdk'



const XAWS = AWSXRay.captureAWS(AWS)

export class S3Access {

    constructor(
        private readonly  s3 = new XAWS.S3({ signatureVersion: 'v4'}),
        private readonly bucketName = process.env.IMAGES_S3_BUCKET,
        private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION
        ) {}





    async generateUserUploadUrl(userId:string, attachmentId: string) {

        const url= this.s3.getSignedUrl('putObject',{
                Bucket: this.bucketName,
                Key: attachmentId,
                Expires: Number(this.urlExpiration)
                })
    
        console.info(`signed url:,${url}`);
    
        const imageUrl = `https://${this.bucketName}.s3.amazonaws.com/${attachmentId}`
    
        console.info(`Attempting to Updating attachmentUrl: ${imageUrl} with attachmentID:${attachmentId} on userId::${userId} `)
        
        const data = {
            uploadUrl: url,
            imageUrl: imageUrl
        }
    
        return data
    
        }





}