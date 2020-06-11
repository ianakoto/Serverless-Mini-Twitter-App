import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import {  reTweet } from "../../businesLogic/tweet"




export const handler: 
        APIGatewayProxyHandler = 
        async (event: APIGatewayProxyEvent): 
        Promise<APIGatewayProxyResult> => {
    
    const newTweet = await reTweet(event)
    
  
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        item: newTweet
      })
    }
  
  
  
  }