# SME Investment Platform

**Drexfy** is a platform designed to facilitate the sale of credit from SMEs (Small and Medium-sized Enterprises) as securitized financial products to debt investors. The platform leverages the XRPL blockchain to issue financial instruments and stablecoins for accounting purposes.

The frontend is developed using Bubble.io, providing an intuitive user interface for investors. On the backend, AWS services handle all operations, including interactions with the XRPL ledger. Additionally, the platform integrates a third-party service for KYC and AML, receiving a WebHook to ensure compliance and enhance security for all transactions.

## What is Drexfy?

**Drexfy** enables the sale of securitized SME credits to investors in Europe. The credits are provided by a securitization company in Brazil, and the platform uses the XRPL blockchain to manage financial instruments and stablecoins. The platform ensures secure transactions through encrypted private keys stored in AWS DynamoDB and decrypted using AWS KMS.

## Requirements

- AWS Lambda
- AWS DynamoDB
- AWS KMS
- XRPL RPC access
- Bubble.io for frontend interactions

## Architecture

### Architecture Overview

The architecture consists of several microservices deployed as AWS Lambda functions, interacting with DynamoDB and XRPL RPC. The system includes AML checks to ensure compliance and secure transactions.

![architecture_overview](https://github.com/hcaumo/Ripple/assets/65081463/914ca162-c1ca-490d-8e6c-0f4f0f0343ec)

## Components

1. **User Interaction**
   - Users interact with the platform through a Bubble.io frontend.
   
2. **Bubble.io Frontend**
   - Provides the user interface for purchasing investments and interacting with their wallets by our backend.

3. **AWS Lambda Microservices**
   - **AML Checker**: Waits for a WebHook from a third-party service, as all users who register on the platform are in a screening process. If there is any change, this Lambda sends information to the frontend to block the user.
   - **Wallet Generator**: Generates new wallets, encrypts private keys using Encrypt PrivateKey Lambda and KMS, deposits 10 XRP to activate the wallet, and supports Authorized Trust Lines in XRPL.
   - **Deposit**: Handles bank deposit transactions and mints stablecoins in the user wallet. **Creates an Authorized Trust Line before receiving funds.**
   - **Transfer Financial Instrument**: Manages the transfer of financial instruments from the securitization company to user wallets.
   - **Transfer Stablecoin**: Manages the transfer of stablecoins from the user wallet to the securitization company.
   - **Encrypt PrivateKey**: Encrypts private keys using AWS KMS.
   - **Decrypt PrivateKey**: Decrypts private keys using AWS KMS.

4. **DynamoDB**
   - Stores encrypted private keys and user wallet addresses.

5. **AWS KMS**
   - Provides encryption and decryption of private keys.

6. **XRPL RPC**
   - Interacts with smart contracts on the XRPL ledger for financial transactions. **Includes setting up Authorized Trust Lines.**

7. **Smart Contracts**
   - **Financial Instrument Smart Contract**
   - **Stablecoin Smart Contract**

8. **Third-Party KYC/AML Service**
   - Integrates with the platform via WebHook to perform KYC and AML checks, ensuring compliance and blocking users if their AML status changes.

## Installation

This platform is known to run on AWS, Bubble.io, and XRPL.

### Steps to Install and Configure

1. **Setup AWS Environment**

   Ensure you have an AWS account and the AWS CLI configured. Install necessary tools and create required IAM roles and policies.

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

   Ensure secure access to XRPL RPC for interacting with smart contracts on the XRPL ledger. **Implement Authorized Trust Lines setup.**

8. **Integrate Third-Party KYC/AML Service**

   Configure the WebHook integration to receive updates on the KYC/AML status of users and take necessary actions within the platform.

## Running the Service

1. **User Operations**

   - Users can create wallets, make deposits, and purchase financial instruments or stablecoins through the Bubble.io frontend.

2. **AML Check**

   - The AML Checker Lambda function waits for a WebHook from a third-party service, as all users who register on the platform are in a screening process. If there is any change, this Lambda sends information to the frontend to block the user.

3. **Wallet Generation and Encryption**

   - The Wallet Generator Lambda function generates wallets, encrypts private keys using the Encrypt PrivateKey Lambda function and KMS, deposits 10 XRP to activate the wallet, and supports Authorized Trust Lines in XRPL.

4. **Purchasing Investments**

   - When a user tries to purchase an investment, Bubble.io sends a request to AWS, triggering a Lambda function that retrieves the private key from DynamoDB, decrypts it using KMS, and performs the transaction on the XRPL ledger.

5. **Setting Up Authorized Trust Line**

   - Before a deposit is accepted, the platform must create an authorized trust line. The **Deposit** Lambda function includes a step to create the authorized trust line using XRPL RPC before minting stablecoins in the user's wallet.

## Monitoring the Service

1. **CloudWatch Monitoring**

   - Use AWS CloudWatch to monitor Lambda functions and DynamoDB for performance and errors.

2. **Logs and Alerts**

   - Configure logs and alerts for real-time monitoring and issue resolution.
