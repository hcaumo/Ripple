# DREXFY

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

## Process

### Register Process

The registration process is a component of the platform, ensuring that all users undergo thorough KYC and AML checks to maintain the compliance and security.

![register_process](https://github.com/hcaumo/Ripple/assets/65081463/42d7aa6b-8f8d-400c-b50b-aafebf422f8a)

**Registration Workflow:**

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

![buy_investment_process](https://github.com/hcaumo/Ripple/assets/65081463/7ff73f5b-9f89-497c-a82f-6bf21db1da4a)

**Investment Purchase Workflow:**

1. **User Initiation**:
   - The investment purchase process begins when a user initiates a purchase through the Bubble.io frontend.

2. **Triggering Backend Services**:
   - Bubble.io sends a request to the AWS API Gateway, which triggers the Deposit Lambda function.

3. **Deposit Handling**:
   - The Deposit Lambda function performs several tasks:
     - It first triggers the Decrypt PrivateKey Lambda function to retrieve and decrypt the user's private key from AWS DynamoDB using AWS KMS.
     - It then interacts with the XRPL RPC to setting up Authorized Trust Lines and issue the equivalent stablecoin amount to the user wallet.
     - It also triggers the Transfer Stablecoin Lambda function.

4. **Stablecoin Transfer**:
   - The Transfer Stablecoin function manages the transfer of stablecoins from the user's wallet to the securitization company wallet.
   - The Transfer Stablecoin function then triggers the Transfer Financial Instrument Lambda function.

5. **Financial Instrument Transfer**:
   - The Transfer Financial Instrument function handles the transfer of financial instruments from the securitization company wallet to the user's wallet, completing the investment purchase process.


### Compliance Process

In **Drexfy**, maintaining compliance with AML regulations is crucial. If a user fails an AML check after registration, the platform takes immediate action to ensure security and compliance.

**WebHook Notification Workflow:**

This workflow ensures that **Drexfy** remains compliant with AML regulations.

![webhook_notification_process](https://github.com/hcaumo/Ripple/assets/65081463/2066663a-83a9-457d-9dd4-c3fe8d7cbe5d)

1. **AML Rejection Notification**:
   - The third-party service continuously monitors users for any changes in their AML status.
   - If a user is flagged for AML issues, the third-party service sends a WebHook notification to the Bubble.io frontend.

2. **User Blocking**:
   - Upon receiving the WebHook, Bubble.io updates the user's status in the database.
   - The user's account is flagged, and they are blocked from making any purchases or Withdrawal on the platform until the issue is resolved.


