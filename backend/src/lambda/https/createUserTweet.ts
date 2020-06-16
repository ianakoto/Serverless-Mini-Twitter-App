import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { createUserTweet } from "../../businesLogic/tweet"



export const handler: 
        APIGatewayProxyHandler = 
        async (event: APIGatewayProxyEvent): 
        Promise<APIGatewayProxyResult> => {
    
    const newTweet = await createUserTweet(event)
    
  
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