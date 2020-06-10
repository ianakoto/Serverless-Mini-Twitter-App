import {  APIGatewayProxyEvent } from 'aws-lambda';
import * as uuid from 'uuid';
import { S3Access } from '../dataLayer/s3Access';

const s3Access = new S3Access();

export async function generateUserUploadUrl(event: APIGatewayProxyEvent) {
   
    const todoId = event.pathParameters.todoId
    const attachmentId = uuid.v4();
    const userId = getUserId(event);
  
   
   
    return s3Access.generateUserUploadUrl(userId,todoId,attachmentId)
}


