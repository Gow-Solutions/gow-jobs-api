import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
} from '@nestjs/common';
import { Job } from '../../entities/jobs.entity';
import { JobsService } from '../../services/jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Put(':jobId')
  async insertOrUpdateJob(@Param('jobId') jobId: string, @Body() jobBody: Job) {
    if (jobId != jobBody.id) {
      throw new BadRequestException(
        jobBody,
        'Param Job ID diferente do Body Job ID.',
      );
    }

    console.log('controller');

    const result = await this.jobsService.createOrUpdate(jobBody);

    return result;
  }
}
