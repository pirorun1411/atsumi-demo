import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dynamoEndpoint = process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000';
const dynamoRegion = process.env.AWS_REGION || 'ap-northeast-1';

const dbClient = new DynamoDBClient({
  endpoint: dynamoEndpoint,
  region: dynamoRegion,
  credentials: {
    accessKeyId: 'local',
    secretAccessKey: 'local',
  },
});

const docClient = DynamoDBDocumentClient.from(dbClient);

async function seedData() {
  try {
    // JSONファイルを読み込み
    const seedFilePath = path.join(__dirname, '../docker/seeds.json');
    const data = JSON.parse(fs.readFileSync(seedFilePath, 'utf-8'));

    console.log(`投入するデータ数: ${data.length}`);

    let successCount = 0;
    let failCount = 0;

    for (const item of data) {
      const params = {
        TableName: 'Purchases',
        Item: {
          id: String(item.id),
          productName: item.productName,
          supplier: item.supplier,
          purchasePrice: item.purchasePrice,
          customer: item.customer,
          sellingPrice: item.sellingPrice,
          commission: item.commission,
          shippingCost: item.shippingCost,
          profit: item.profit,
          profitMargin: item.profitMargin,
          status: item.status,
        },
      };

      try {
        const command = new PutCommand(params);
        await docClient.send(command);
        console.log(`✓ ID ${item.id} を投入`);
        successCount++;
      } catch (error) {
        console.error(`✗ ID ${item.id} の投入に失敗:`, error.message);
        failCount++;
      }
    }

    console.log(`\n投入完了: 成功 ${successCount}件, 失敗 ${failCount}件`);
    process.exit(failCount > 0 ? 1 : 0);
  } catch (error) {
    console.error('シードデータの投入に失敗:', error.message);
    process.exit(1);
  }
}

seedData();
