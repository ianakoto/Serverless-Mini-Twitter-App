import {  S3Handler, S3Event } from "aws-lambda"
import { sendUploadNotifications } from "../../businesLogic/image"




export const handler: 
        S3Handler = 
        async (event: S3Event) => {
    
    await sendUploadNotifications(event)
    
  
  
  
  }