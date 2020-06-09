# Serverless Mini Twitter App
This is a serverless application to mimic the basic functionality of the popular twitter app. The application lets you sign up as a user to post images, like images, add tags to images and follow other users to recieve their feed.


# Functionality of the application

This application will allow creating/removing/updating/fetching/follow Tweet items. Each Tweet item can optionally have an attachment image and a comment. Each user only has access to Tweet items that he/she has created but can recieved Tweet items from other users if that user follows other users. Each user can Like, Comment on Tweet items from followed users. Users can also retweet a post from other users or from the same user.

# Tweet items

The application should store Tweet items, and each Tweet item contains the following fields:

* `tweetId` (string) - a unique id for a tweet item
* `createdAt` (string) - date and time when an item was created
* `like` (int) - number indicating the likes of a tweet ( zero by default)
* `comment` (dict)? - Tweet comments on posted tweets
* `userId` (string) - the user id for posting the tweet 
* `tweethandler` (string) - the user for posting the tweet (e.g. @name )
* `attachmentUrl` (string) (optional) - a URL pointing to a thumbnail image attached to a Tweet item



# Functions to be implemented

To implement this project, you need to implement the following functions and configure them in the `serverless.yml` file:

* `Auth` - this function should implement a aws cognito authorizer for API Gateway that should be added to all other functions.

* `GetTweets` - should return all Tweets for a current user. A user id can be extracted from a JWT token that is sent by the frontend

It should return data that looks like this:

```json
{
  "items": [
    {
      "tweetId": "123",
      "createdAt": "2019-07-27T20:01:45.424Z",
      "like": 3,
      "comment": {"comment":"This is great",
                  "tweethandler": @ken,
                  "createdAt": "2019-05-27T20:01:45.424Z"
                  },
      "userId": 34555,
      "tweethandler": "@somebody",
      "attachmentUrl": "http://example.com/image.png"
    },
    {
      "tweetId": "453",
      "createdAt": "2019-05-27T20:01:45.424Z",
      "like": 0,
      "comment": {"comment":"This is fake. don't believe",
            "tweethandler": @ken,
            "createdAt": "2019-05-27T20:01:45.424Z"
            },
      "userId": 5564,
      "tweethandler": "@nobody",
      "attachmentUrl": "http://example.com/image.png"
    },
  ]
}
```

* `CreateTweet` - should create a new Tweet for a current user. A shape of data send by a client application to this function can be found in the `CreateTweetRequest.ts` file

It receives a new Tweet item to be created in JSON format that looks like this:

```json
{
  "createdAt": "2019-05-27T20:01:45.424Z",
  "like": 0,
  "comment": {"comment":"This is great",
              "tweethandler": @ken,
              "createdAt": "2019-05-27T20:01:45.424Z"
              },
  "userId": 5564,
  "tweethandler": "@nobody",
  "attachmentUrl": "http://example.com/image.png"
}
```

It should return a new Tweet item that looks like this:

```json
{
  "item": {
   "createdAt": "2019-05-27T20:01:45.424Z",
   "like": 0,
  "comment": {"comment":"This is great",
              "tweethandler": @ken,
              "createdAt": "2019-05-27T20:01:45.424Z"
              },
   "userId": 5564,
   "tweethandler": "@nobody',
   "attachmentUrl": "http://example.com/image.png"
  }
}
```

* `UpdateTweet` - should update a Tweet item created by a current user. A shape of data send by a client application to this function can be found in the `UpdateTwetRequest.ts` file

It receives an object that contains one field that can be updated in a Tweet item:

```json
{
  "like": 7,
}
```

The id of an item that should be updated is passed as a URL parameter.

It should return an empty body.

* `DeleteTweet` - should delete a Tweet item created by a current user. If tweets from other users is deleted, it should not delete the tweet of the followed user but remove it from the tweets feed of the current user. Expects an id of a Tweet item to remove.

It should return an empty body.


* `AddComments` - should add comments to a post. followed users can add their comments to a post.

It receives a new Tweet comments to be added in JSON format that looks like this:

```json
{
 "comment":"This is great",
 "tweethandler": @ken,
 "createdAt": "2019-05-27T20:01:45.424Z"
}

```
it should return tweet item with added comments that looks like thus 

```
{
  "createdAt": "2019-05-27T20:01:45.424Z",
  "like": 0,
  "comment": items{
                     {
                      "comment":"This is great",
                      "tweethandler": @ken,
                      "createdAt": "2019-05-27T20:01:45.424Z"
                      },
                      {
                      "comment":"This is fat",
                      "tweethandler": @Okra,
                      "createdAt": "2019-05-27T20:01:45.424Z"
                      }
                  },
  "userId": 5564,
  "tweethandler": "@nobody",
  "attachmentUrl": "http://example.com/image.png"
}

```


* `GenerateUploadUrl` - returns a pre-signed URL that can be used to upload an attachment file for a Tweet item.

It should return a JSON object that looks like this:

```json
{
  "uploadUrl": "https://s3-bucket-name.s3.eu-west-2.amazonaws.com/image.png"
}
```

All functions are already connected to appropriate events from API Gateway.

An id of a user can be extracted from a JWT token passed by a client.

You also need to add any necessary resources to the `resources` section of the `serverless.yml` file such as DynamoDB table and S3 bucket.


# Frontend

The `client` folder contains a web application that can use the API that should be developed in the project.


## Authentication



# Best practices



## Logging

The starter code comes with a configured [Winston](https://github.com/winstonjs/winston) logger that creates [JSON formatted](https://stackify.com/what-is-structured-logging-and-why-developers-need-it/) log statements. You can use it to write log messages like this:

```ts
import { createLogger } from '../../utils/logger'
const logger = createLogger('auth')

// You can provide additional information with every log statement
// This information can then be used to search for log statements in a log storage system
logger.info('User was authorized', {
  // Additional information stored with a log statement
  key: 'value'
})
```




# DynamoDB

To store Tweet items, you might want to use a DynamoDB table with local secondary index(es). A create a local secondary index you need to create a DynamoDB resource like this:

```yml

TodosTable:
  Type: AWS::DynamoDB::Table
  Properties:
    AttributeDefinitions:
      - AttributeName: partitionKey
        AttributeType: S
      - AttributeName: sortKey
        AttributeType: S
      - AttributeName: indexKey
        AttributeType: S
    KeySchema:
      - AttributeName: partitionKey
        KeyType: HASH
      - AttributeName: sortKey
        KeyType: RANGE
    BillingMode: PAY_PER_REQUEST
    TableName: ${self:provider.environment.TODOS_TABLE}
    LocalSecondaryIndexes:
      - IndexName: ${self:provider.environment.INDEX_NAME}
        KeySchema:
          - AttributeName: partitionKey
            KeyType: HASH
          - AttributeName: indexKey
            KeyType: RANGE
        Projection:
          ProjectionType: ALL # What attributes will be copied to an index

```

To query an index you need to use the `query()` method like:

```ts
await this.dynamoDBClient
  .query({
    TableName: 'table-name',
    IndexName: 'index-name',
    KeyConditionExpression: 'paritionKey = :paritionKey',
    ExpressionAttributeValues: {
      ':paritionKey': partitionKeyValue
    }
  })
  .promise()
```

# How to run the application

## Backend

To deploy an application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

This should start a development server with the Ionic application that will interact with the serverless Tweeter application.

# Postman collection

An alternative way to test your API, you can use the Postman collection that contains sample requests. You can find a Postman collection in this project. To import this collection, do the following.

