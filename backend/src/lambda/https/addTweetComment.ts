import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { addTweetComment } from "../../businesLogic/tweet"




export const handler: 
        APIGatewayProxyHandler = 
        async (event: APIGatewayProxyEvent): 
        Promise<APIGatewayProxyResult> => {
    
    const newTweet = await addTweetComment(event)
    
  
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