GitHub Repository README Template

Title: AWS Lambda Math Evaluator for Bubble.io

Description:
This AWS Lambda function provides an efficient way to evaluate mathematical expressions from a Bubble.io application. It accepts a string expression, evaluates its result, and returns it, ensuring precision up to 10 decimal places where necessary.
Features

    Validates input to ensure it is a proper mathematical expression.
    Handles very small results with precision, managing decimal representation.
    Ensures results are formatted to avoid unnecessary trailing zeroes.

Prerequisites

    AWS Account
    Node.js installed on your local development machine
    Access to AWS Lambda and API Gateway
    A Bubble.io account for integrating the Lambda function

Usage

    Deploy the Function:
        Zip the index.js file containing the Lambda function code.
        Upload the zip file to AWS Lambda.
        Set up an execution role in IAM that allows the Lambda function to run.

    Setup API Gateway:
        Create a new API in AWS API Gateway.
        Set up a new resource and a POST method linked to your Lambda function.
        Deploy the API to create a new stage and get the invocation URL.

    Integrate with Bubble.io:
        In your Bubble.io app, use the API Connector plugin to set up API calls.
        Configure the API call to use the POST method and include the expression in the request body.

API Reference

    Endpoint: POST /evaluate
    Request Body:

    json

{
  "expression": "2 + 2"
}

Success Response:

json

{
  "result": 4
}

Error Response:

json

    {
      "error": "Expression must be a string"
    }

Error Handling

    Returns HTTP 400 for requests without an expression or with an invalid expression format.
    Logs detailed error messages for troubleshooting.