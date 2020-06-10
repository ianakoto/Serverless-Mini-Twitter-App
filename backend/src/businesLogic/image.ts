import {  APIGatewayProxyEvent, S3Event } from 'aws-lambda';
import * as uuid from 'uuid';
import { S3Access } from '../dataLayer/s3Access';

const s3Access = new S3Access();

export async function generateUserUploadUrl(event: APIGatewayProxyEvent) {
   
    const todoId = event.pathParameters.todoId
    const attachmentId = uuid.v4();
    const userId = getUserId(event);
  
   
   
    return s3Access.generateUserUploadUrl(userId,todoId,attachmentId)
}



export async function sendUploadNotifications(event: S3Event) {
    for (const record of event.Records) {
        const key = record.s3.object.key
        s3Access.SendUploadNotifications(key)
    }

}