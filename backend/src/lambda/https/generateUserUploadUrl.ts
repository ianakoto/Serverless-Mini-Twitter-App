import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { generateUserUploadUrl } from "../../businesLogic/image"



export const handler: 
        APIGatewayProxyHandler = 
        async (event: APIGatewayProxyEvent): 
        Promise<APIGatewayProxyResult> => {
    
    const response = await generateUserUploadUrl(event);
    const url = response.uploadUrl;
    const imageurl =  response.imageUrl;
    
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        uploadUrl: url,
        imageUrl: imageurl
      })
    }
  
  
  
  }