import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
} from '@nestjs/common';
import { Job } from './jobs.model';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Put(':jobId')
  async insertOrUpdateJob(@Param('jobId') jobId: string, @Body() jobBody: Job) {
    if (jobId != jobBody.jobId) {
      throw new BadRequestException(
        jobBody,
        'Param Job ID diferente do Body Job ID.',
      );
    }

    const result = await this.jobsService.createOrUpdate(jobBody);

    return result;
  }
}
