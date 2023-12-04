import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'src/jobs/jobs.model';

describe('dynamoDB', () => {
  it('should be defined', () => {
    const job: Job = {
      applicants: 23,
      jobId: '210987654',
      description: 'description desc des...',
      title: 'my title goes here',
      views: 200,
    };
  });
});
