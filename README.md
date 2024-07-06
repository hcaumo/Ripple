# DREXFY

**Disclaimer:** The code uploaded here is a legacy version developed for an EVM blockchain. We are currently working on translating it to XRPL and adding new features.

**Drexfy** is an investment platform that facilitates the sale of SME (Small and Medium-sized Enterprises) credit as securitized financial products to debt investors in Europe. The platform leverages the XRPL blockchain to issue a non-collateralized stablecoin and financial instruments.

The frontend, developed with Bubble.io, offers an intuitive user interface for investors. On the backend, AWS services handle all operations, including interactions with the XRPL. The platform also integrates a third-party service for KYC and AML checks, ensuring compliance and enhancing security through WebHook notifications.

## Requirements

- AWS Lambda
- AWS DynamoDB
- AWS KMS
- XRPL RPC access
- Bubble.io for frontend interactions
- Third-Party KYC/AML service
- Third-Party Payment Gateway

## Architecture

### Architecture Overview

The architecture consists of several microservices deployed as AWS Lambda functions, interacting with DynamoDB and XRPL RPC. The system includes AML checks to ensure compliance and secure transactions.


## Components
   
1. **Bubble.io Frontend**
   - Provides the user interface for purchasing investments and interacting with their wallets by our backend.

2. **AWS Lambda Microservices**
   - **AML Checker**: Waits for a WebHook from a third-party service, as all users who register on the platform are in a screening process. If there is any change, this Lambda sends information to the frontend to block the user.
   - **Wallet Generator**: Generates new wallets, encrypts private keys using Encrypt PrivateKey Lambda and KMS, deposits 15 XRP to activate the wallet, supports Authorized Trust Lines and transaction gas in XRPL.
   - **Deposit**: Handles bank deposit transactions and mints stablecoins in the user wallet. **Creates an Authorized Trust Line before receiving funds.**
   - **Transfer Financial Instrument**: Manages the transfer of financial instruments from the securitization company to user wallets.
   - **Transfer Stablecoin**: Manages the transfer of stablecoins from the user wallet to the securitization company wallet.
   - **Encrypt PrivateKey**: Encrypts private keys using AWS KMS.
   - **Decrypt PrivateKey**: Decrypts private keys using AWS KMS.

3. **DynamoDB**
   - Stores encrypted private keys and user wallet addresses.

4. **AWS KMS**
   - Provides encryption and decryption of private keys.

5. **XRPL RPC**
   - Interacts with smart contracts on the XRPL.

6. **Smart Contracts**
   - **Financial Instrument Smart Contract**
   - **Stablecoin Smart Contract**

7. **Third-Party KYC/AML Service**
   - Integrates with the platform via WebHook to perform KYC and AML checks, ensuring compliance and blocking users if their AML status changes.

## Process

### Register Process

The registration process is a component of the platform, ensuring that all users undergo thorough KYC and AML checks to maintain the compliance and security.

**Registration Workflow:**

![register_process](https://github.com/hcaumo/Ripple/assets/65081463/3996b464-5764-43ea-b062-dbc903403574)


1. **User Registration**:
   - Users start by interacting with the Bubble.io frontend to register on the platform.
   
2. **KYC/AML Check**:
   - Bubble.io sends user details to a third-party service for KYC and AML checks.
   
3. **Wallet Generation**:
   - Once the user passes the KYC/AML check, Bubble.io triggers the Wallet Generator Lambda function via API Gateway.
   - The Wallet Generator Lambda function generates a new wallet, encrypts the private key using the Encrypt PrivateKey Lambda function and AWS KMS.
   - The encrypted private key is stored in AWS DynamoDB.
   - To activate the wallet, 15 XRP is deposited, making the wallet capable of supporting Authorized Trust Lines and make transactions in the XRPL.

This process ensures that all users are thoroughly vetted before they can participate in the platform, maintaining compliance with financial regulations and providing a secure environment for all transactions.

### Buy Investment Process

**Drexfy** provides a seamless experience for investors looking to purchase securitized SME credits. The platform leverages advanced blockchain technology and robust AWS services to manage and execute these transactions securely and efficiently.



**Buy Investment Workflow:**

![buy_investment_process](https://github.com/hcaumo/Ripple/assets/65081463/ff567e70-46c4-4f44-b675-cc0d25d0624e)

1. **User Initiation**:
    - The investment purchase process begins when a user initiates a purchase through the Bubble.io frontend and opens the payment gateway checkout.
    - Bubble.io retrieves the user's wallet address from the Bubble.io database.

2. **Payment Gateway Interaction**:
    - The payment gateway processes the payment and sends a webhook to the AWS API Gateway, which triggers the Deposit Lambda function.

3. **Deposit Handling**:
    - The Deposit Lambda function performs several tasks:
        - It first triggers the Decrypt PrivateKey Lambda function to retrieve and decrypt the user's private key from AWS DynamoDB using AWS KMS.
        - It then interacts with the XRPL RPC to set up Authorized Trust Lines and issue the equivalent stablecoin amount to the user's wallet.
        - It also triggers the Transfer Stablecoin Lambda function.

4. **Stablecoin Transfer**:
    - The Transfer Stablecoin function manages the transfer of stablecoins from the user's wallet to the securitization company's wallet.
    - The Transfer Stablecoin function then triggers the Transfer Financial Instrument Lambda function.

5. **Financial Instrument Transfer**:
    - The Transfer Financial Instrument function handles the transfer of financial instruments from the securitization company's wallet to the user's wallet, completing the investment purchase process.



### Compliance Process

In **Drexfy**, maintaining compliance with AML regulations is crucial. If a user fails an AML check after registration, the platform takes immediate action to ensure security and compliance.

**WebHook Notification Workflow:**

This workflow ensures that **Drexfy** remains compliant with AML regulations.

![webhook_notification_process](https://github.com/hcaumo/Ripple/assets/65081463/f15870fb-5f9a-4ecf-9b2b-47904e7cd2f9)

1. **AML Rejection Notification**:
   - The third-party service continuously monitors users for any changes in their AML status.
   - If a user is flagged for AML issues, the third-party service sends a WebHook notification to the AML Checker Lambda function.

2. **User Blocking**:
   - Upon receiving the WebHook, the AML Checker Lambda function notifies the Bubble.io frontend.
   - The Bubble.io frontend updates the user's status in the database.
   - The user's account is flagged, and they are blocked from making any purchases or withdrawals on the platform until the issue is resolved.



## Installation

### Steps to Install and Configure

1. **Setup AWS Environment**

   Ensure you have an AWS account and the AWS CLI configured. Install necessary tools and create required IAM roles and policies. Make sure to set all necessary authorizations in IAM for the Lambda functions to read and write to DynamoDB and interact with other services.

2. **Deploy DynamoDB**

   Create a DynamoDB table to store encrypted private keys and user wallet addresses.

3. **Setup AWS KMS**

   Create KMS keys for encrypting and decrypting private keys.

4. **Deploy Lambda Functions**

   Deploy the following Lambda functions using the AWS Lambda console or AWS CLI:
   - AML Checker
   - Wallet Generator
   - Deposit
   - Transfer Financial Instrument
   - Transfer Stablecoin
   - Encrypt PrivateKey
   - Decrypt PrivateKey

5. **Configure API Gateway**

   Set up API Gateway to trigger the Lambda functions based on API requests from Bubble.io.

6. **Setup Bubble.io Frontend**

   Use Bubble.io to create the user interface for interacting with the platform. Integrate with AWS API Gateway for backend operations.

7. **Integrate with XRPL RPC**

   Ensure secure access to XRPL RPC for interacting with smart contracts on the XRPL ledger. Implement Authorized Trust Lines setup.

8. **Integrate Third-Party KYC/AML Service**

   Configure the WebHook integration to receive updates on the KYC/AML status of users and take necessary actions within the platform.

9. **Integrate Payment Gateway**

   Set up the payment gateway to handle transactions and configure webhooks to trigger the Deposit Lambda function upon successful payment.

   ### AWS IAM Permissions

To ensure that all Lambda functions have the necessary permissions to interact with other AWS services, follow these steps to configure AWS IAM roles and policies:

1. **Create IAM Roles for Lambda Functions**

   For each Lambda function, create a dedicated IAM role that grants the necessary permissions. You can create roles in the AWS Management Console or using the AWS CLI.

2. **Attach Policies to IAM Roles**

   Attach policies to each IAM role to grant the required permissions. Below are the key permissions needed for the Drexfy platform:

   - **DynamoDB Access**:
     ```json
     {
       "Effect": "Allow",
       "Action": [
         "dynamodb:GetItem",
         "dynamodb:PutItem",
         "dynamodb:UpdateItem",
         "dynamodb:Query",
         "dynamodb:Scan"
       ],
       "Resource": "arn:aws:dynamodb:REGION:ACCOUNT_ID:table/TABLE_NAME"
     }
     ```

   - **KMS Access**:
     ```json
     {
       "Effect": "Allow",
       "Action": [
         "kms:Encrypt",
         "kms:Decrypt",
         "kms:GenerateDataKey"
       ],
       "Resource": "arn:aws:kms:REGION:ACCOUNT_ID:key/KEY_ID"
     }
     ```

   - **API Gateway Invocation**:
     ```json
     {
       "Effect": "Allow",
       "Action": [
         "execute-api:Invoke"
       ],
       "Resource": "arn:aws:execute-api:REGION:ACCOUNT_ID:API_ID/*"
     }
     ```

   - **CloudWatch Logs Access**:
     ```json
     {
       "Effect": "Allow",
       "Action": [
         "logs:CreateLogGroup",
         "logs:CreateLogStream",
         "logs:PutLogEvents"
       ],
       "Resource": "*"
     }
     ```

3. **Assign IAM Roles to Lambda Functions**

   Assign the created IAM roles to the respective Lambda functions. This can be done in the AWS Management Console under the Lambda function's configuration or using the AWS CLI.

By setting up these IAM roles and attaching the appropriate policies, you ensure that your Lambda functions have the necessary permissions to read and write from DynamoDB, encrypt and decrypt data with KMS, invoke API Gateway endpoints, and log to CloudWatch. This configuration is essential for the secure and efficient operation of the Drexfy platform.








