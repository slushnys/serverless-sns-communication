# Serverless implementation with SNS

The purpose of this repository is to show the implementation of CRUD functionality within AWS lambda.

SNS is used for pub/sub purposes in order to update an attribute of a Model based on an external trigger.

## Installation

> Note: Use --no-optional parameter to avoid npm installing `dtrace-provider` as an optional depenceny which emits module errors.

`npm install --no-optional`

Install DynamoDB locally:

`serverless dynamodb install`

Start offline serverless service

`serverless offline start` or `npm run start`

## Manual Testing

To test the flow locally, run the offline serverless service and go to requests.http file. There are the "happy path" to go through in order to test function calls and responses.

Explanation:

1. Get all resources /all
2. Create a resource passing a payload with amount and companyId parameters
3. Query all to see if the loan has been created.
4. Send a post request to /disburse endpoint with the loans id.
5. Get all resources /all and check the status of that request which should have been updated to "disbursed" through SNS.

## Automatic testing

> Note: facing some problems running tests, sometimes it cannot recreate the tables that are created, sometimes it runs for too long due to async/await fault jest fault.

> Apparently when I run individual tests through VSCode the server doesn't close and the afterAll/afterEach callbacks don't trigger. Server also still keeps running therefore resulting in `ResourceInUseException: Cannot create preexisting table` error which was really annoying to keep on getting.

To start the tests run

`npm test`
