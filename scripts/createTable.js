import { DynamoDBClient, CreateTableCommand } from '@aws-sdk/client-dynamodb';

const dynamoEndpoint = process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000';
const dynamoRegion = process.env.AWS_REGION || 'ap-northeast-1';

const client = new DynamoDBClient({
  endpoint: dynamoEndpoint,
  region: dynamoRegion,
  credentials: {
    accessKeyId: 'local',
    secretAccessKey: 'local',
  },
});

const createTable = async () => {
  const params = {
    TableName: 'Purchases',
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
    BillingMode: 'PAY_PER_REQUEST',
  };

  try {
    const command = new CreateTableCommand(params);
    const result = await client.send(command);
    console.log('✓ テーブルが作成されました:', result.TableDescription.TableName);
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log('✓ テーブルは既に存在します');
    } else {
      console.error('✗ テーブル作成エラー:', error.message);
      process.exit(1);
    }
  }
};

createTable();
