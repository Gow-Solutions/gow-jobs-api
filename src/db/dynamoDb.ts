import { Converter, DocumentClient } from 'aws-sdk/clients/dynamodb';
import 'dotenv/config';
import { Job } from 'src/jobs/jobs.model';

export function dynamoDbClient(): DocumentClient {
  return new DocumentClient({
    region: process.env.REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
}
