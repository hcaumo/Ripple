AWS Blockchain Tools Overview`



Current Architecture for National Investors:

![1 drawio (1)](https://github.com/hcaumo/Ripple/assets/65081463/cdb3095b-f625-4388-a890-b04d0b852967)


This repository contains a collection of AWS Lambda functions designed to interact with blockchain technologies. Each function serves a specific purpose, facilitating operations like token deposits, permissions management, mathematical operations for blockchain, wallet generation, and token transfers.
Tools Included

AWSDeposit

    Description: Handles deposits of cryptocurrency into specified wallet addresses.
    Main Features: Validates deposit requests and interacts with blockchain to deposit tokens.

AWSPermit

    Description: Manages permissions within smart contracts to allow or restrict user actions.
    Main Features: Sets and revokes permissions using Ethereum smart contract calls.

AWSMath

    Description: Provides mathematical calculations required for transaction processing or smart contract interactions.
    Main Features: Processes complex math operations and returns results to the caller.

AWSWalletGenerator

    Description: Generates new blockchain wallet addresses and keys.
    Main Features: Uses cryptographic libraries to ensure secure key generation.

AWSTransferFromOriginatorToUser

    Description: Facilitates the transfer of tokens from an asset originator to a user's wallet.
    Main Features: Validates transaction details and executes the transfer using smart contracts.

AWSTransferFromUserToOriginator

    Description: Manages the reverse transfer of tokens from users back to the originator.
    Main Features: Ensures secure and validated transfer operations back to the originator's wallet.


Bubble.io:

    Frontend Architecture: Choosing Bubble.io over ReactJS
    Why Bubble.io?

    In our continuous effort to streamline development and enhance the security of our applications, we have transitioned our frontend development from ReactJS to Bubble.io. This strategic shift responds to our team's size and the need for agility and security in our application deployments.

    1. Development Speed and Efficiency:
    Our team, being relatively small, requires a development platform that allows us to move quickly without sacrificing quality. Bubble.io enables us to build and iterate faster than traditional programming in ReactJS. This rapid development cycle is crucial for meeting project deadlines and responding swiftly to market or regulatory changes.

    2. Enhanced Security:
    Security is a cornerstone of our development philosophy. By adopting Bubble.io, we leverage a platform that is SOC 2 Type 2 compliant, with rigorous security audits that our previous ReactJS-based implementations could not easily achieve. Bubble.io's managed environment reduces our exposure to common security pitfalls associated with custom code and manual security configurations.

    3. Data Protection and Compliance:
    Compliance with data protection regulations is simpler and more robust with Bubble.io. The platform's built-in security measures ensure that all data handled is secure and compliant with the latest data protection laws. This is a significant advantage over custom-built ReactJS applications, where each project might require separate compliance validations.

    4. Integration with Secure Tools:
    Our use of Bubble.io is complemented by our backend services on AWS, which also adheres to SOC 2 Type 2 standards. This combination ensures that both the tools we use to send and receive information are consistently updated against vulnerabilities and are audited more extensively than what we could perform with tailor-made ReactJS code in every project.
    Conclusion

    By integrating Bubble.io into our development stack, we not only accelerate our development processes but also enhance the overall security and compliance posture of our applications. This approach allows us to focus more on feature development and less on the complexities of backend maintenance and security compliance, delivering a secure, compliant, and efficient solution to our users.


Architecture using Ripple (International Investors Enabled):


![2 drawio](https://github.com/hcaumo/Ripple/assets/65081463/3b4441bd-e13d-40f0-b764-28d0651c321c)


New Architecture:(International investores payments using ripple)

    0. Wallet Creation: We'll generate wallets using the Ripple Elliptic Curve for secure transactions.
    0.2 Identity & Activation: An identity will be created within Ripple Payments, along with the required 10XRP account activation.
    4. Trust Lines: Authorized trust lines will be established to receive xDrexfy and the desired token.
    5. Payment Layer: A new layer using Ripple Payments will be created to facilitate transactions.
    9. Sending Funds: We'll initiate the payment process.
    10. Quote for Swap: If applicable, a quote for swapping XRP to EUR can be obtained.
    11. Quote Approval: The user can then accept or decline the swap quote.
    12. Batch Payment: Finally, a batch payment transaction will be executed for all investors.

* Consider the red lines part from the new architecture


Just compile in Remix and Deploy.


AWS Lambda Installation:

    Upload to Lambda: Upload each individual zip file generated in "dist" folder to your AWS Lambda function using the latest Node.js Lambda architecture after this commands:

In each folder:

    1. npm run prebuild
    2. npm run esbuild
    3. npm run postbuild

Smart Contract Installation:

    Compile and Deploy: Simply compile your smart contracts in Remix and deploy them to the desired network.

Security and Usage

    Endpoint Security: All functions are accessed via secured API Gateway endpoints.
    Authentication: Requires proper authentication credentials to access each function.
    Error Handling: Each function has robust error handling for a variety of input and operational errors.


