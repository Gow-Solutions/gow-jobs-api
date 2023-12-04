import { dynamoDbClient } from 'src/db/dynamoDb';
import { Job } from './jobs.model';
import { Injectable } from '@nestjs/common';
import { Converter } from 'aws-sdk/clients/dynamodb';

@Injectable()
export class JobsService {
  async createOrUpdate(job: Job) {
    const dynamoObject = Converter.marshall(job, { convertEmptyValues: true });

    console.log('Dynamo Object >>', dynamoObject);

    return await dynamoDbClient()
      .put({
        TableName: 'jobs',
        Item: dynamoObject,
      })
      .promise();
  }
}
