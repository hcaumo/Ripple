# SME Investment Platform

**SME Investment Platform** is an investment platform designed to facilitate the sale of credit from SMEs (Small and Medium-sized Enterprises) as securitized financial products to debt investors. The platform leverages the XRPL blockchain to issue financial instruments and stablecoins for accounting purposes. The frontend is developed using Bubble.io, while AWS handles the backend operations, including interactions with the XRPL ledger.

## What is SME Investment Platform?

**SME Investment Platform** enables the sale of securitized SME credits to investors in Europe. The credits are provided by a securitization company in Brazil, and the platform uses the XRPL blockchain to manage financial instruments and stablecoins. The platform ensures secure transactions through encrypted private keys stored in AWS DynamoDB and decrypted using AWS KMS.

## Requirements

- AWS Lambda
- AWS DynamoDB
- AWS KMS
- XRPL RPC access
- Bubble.io for frontend interactions

## Architecture

### Architecture Overview

The architecture consists of several microservices deployed as AWS Lambda functions, interacting with DynamoDB and XRPL RPC. The system includes AML checks to ensure compliance and secure transactions.

![architecture_overview](https://github.com/hcaumo/Ripple/assets/65081463/a1b75f3c-3e50-4daf-90b0-8f69485f3ba6)

## Components

1. **User Interaction**
   - Users interact with the platform through a Bubble.io frontend.
   
2. **Bubble.io Frontend**
   - Provides the user interface for purchasing investments and interacting with their wallets by our backend.

3. **AWS Lambda Microservices**
   - **AML Checker**: Checks user compliance and updates user status in the bubble database.
   - **Wallet Generator**: Generates new wallets and encrypts private keys using Encrypt PrivateKey Lambda and KMS.
   - **Deposit**: Handles bank deposit transactions and mint a stablecoin in the user wallet.
   - **Transfer Financial Instrument**: Manages the transfer of financial instruments from the securitization company to user wallet.
   - **Transfer Stablecoin**: Manages the transfer of stablecoins from the user wallet to the securitization company.
   - **Encrypt PrivateKey**: Encrypts private keys using AWS KMS.
   - **Decrypt PrivateKey**: Decrypts private keys using AWS KMS.

4. **DynamoDB**
   - Stores encrypted private keys and user wallet address.

5. **AWS KMS**
   - Provides encryption and decryption of private keys.

6. **XRPL RPC**
   - Interacts with smart contracts on the XRPL ledger for financial transactions.

7. **Smart Contracts**
   - **Financial Instrument Smart Contract**
   - **Stablecoin Smart Contract**

## Installation

This platform is known to run on AWS, Bubble.io and XRPL.

### Steps to Install and Configure

1. **Setup AWS Environment**

   Ensure you have an AWS account and the AWS CLI configured. Install necessary tools and create required IAM roles and policies.

2. **Deploy DynamoDB**

   Create a DynamoDB table to store encrypted private keys and user wallet addresses.

3. **Setup AWS KMS**

   Create KMS keys for encrypting and decrypting private keys.

4. **Deploy Lambda Functions**

   Deploy the following Lambda functions using AWS Lambda console or AWS CLI:
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

   Ensure secure access to XRPL RPC for interacting with smart contracts on the XRPL ledger.

## Running the Service

1. **User Operations**

   - Users can create wallets, make deposits, and purchase financial instruments or stablecoins through the Bubble.io frontend.

2. **AML Check**

   - The AML Checker Lambda function validates if a user can create an account on the platform and if the user can withdraw money from the platform.

3. **Wallet Generation and Encryption**

   - The Wallet Generator Lambda function generates wallets and encrypts private keys using the Encrypt PrivateKey Lambda function and KMS.

4. **Purchasing Investments**

   - When a user tries to purchase an investment, Bubble.io sends a request to AWS, triggering a Lambda function that retrieves the private key from DynamoDB, decrypts it using KMS, and performs the transaction on the XRPL ledger.

## Monitoring the Service

1. **CloudWatch Monitoring**

   - Use AWS CloudWatch to monitor Lambda functions and DynamoDB for performance and errors.

2. **Logs and Alerts**

   - Configure logs and alerts for real-time monitoring and issue resolution.

