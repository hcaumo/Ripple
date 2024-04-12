import { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import { ethers } from 'ethers';
import * as AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = 'WalletData'; // Nome da sua tabela DynamoDB
const mnemonic = "MNEMONICHERE";
const baseDerivationPath = `m/44'/60'/0'/0/`; 

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
    let lastIndex = await getLastIndex();
    const newPath = baseDerivationPath + lastIndex;
    const wallet = ethers.Wallet.fromPhrase(mnemonic).derivePath(newPath);

    await storeWalletData(wallet.address, wallet.address, wallet.privateKey);
    await updateLastIndex(lastIndex + 1);

    const response = {
        statusCode: 200,
        body: JSON.stringify({ address: wallet.address }),
    };
    return response;
};

async function getLastIndex(): Promise<number> {
    const params = {
        TableName: tableName,
        Key: { 'id': 'index' }
    };

    const data = await dynamoDb.get(params).promise();
    return data.Item ? data.Item.lastIndex : 0;
}

async function updateLastIndex(newIndex: number): Promise<void> {
    const params = {
        TableName: tableName,
        Key: { 'id': 'index' },
        UpdateExpression: 'set lastIndex = :i',
        ExpressionAttributeValues: {
            ':i': newIndex
        }
    };

    await dynamoDb.update(params).promise();
}

async function storeWalletData(id: string, address: string, privateKey: string): Promise<void> {
    const params = {
        TableName: tableName,
        Item: {
            'id': id,
            'address': address,
            'privateKey': privateKey
        }
    };

    await dynamoDb.put(params).promise();
}
