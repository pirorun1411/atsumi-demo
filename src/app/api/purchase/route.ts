import { NextResponse } from 'next/server';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const dynamoEndpoint = process.env.DYNAMODB_ENDPOINT ?? 'http://localhost:8000';
const dynamoRegion = process.env.AWS_REGION ?? 'ap-northeast-1';

const dbClient = new DynamoDBClient({
  endpoint: dynamoEndpoint,
  credentials: { accessKeyId: 'fakeAccessKey', secretAccessKey: 'fakeSecretAccessKey' },
  region: dynamoRegion,
});

const docClient = DynamoDBDocumentClient.from(dbClient);

type PurchaseItem = {
  id: string;
  productName?: string;
  supplier?: string;
  purchasePrice?: string;
  customer?: string;
  sellingPrice?: string;
  commission?: string;
  shippingCost?: string;
  profit?: string;
  profitMargin?: string;
  status?: string;
};

export async function GET() {
  try {
    const scanCommand = new ScanCommand({
      TableName: 'Purchases',
    });
    const scanResult = await docClient.send(scanCommand);
    const purchases: PurchaseItem[] = (scanResult.Items ?? []) as PurchaseItem[];

    purchases.sort((a, b) => Number(a.id) - Number(b.id));

    return NextResponse.json(purchases, { status: 200 });
  } catch (error: unknown) {
    console.error('Failed to fetch purchase list:', error);

    const message = error instanceof Error ? error.message : typeof error === 'string' ? error : JSON.stringify(error);

    return NextResponse.json(
      {
        message: 'Failed to fetch purchase list',
        error: message,
      },
      { status: 500 },
    );
  }
}
