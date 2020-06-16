import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import {  getUserTweet } from "../../businesLogic/tweet"



export const handler: 
        APIGatewayProxyHandler = 
        async (event: APIGatewayProxyEvent): 
        Promise<APIGatewayProxyResult> => {
    
    const newTweet = await getUserTweet(event)
    
  



    if(newTweet.length != 0) {

        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({
            items: newTweet
          })
        }
    
      }
     
    
    
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: ''
      }
  
  
  
  }