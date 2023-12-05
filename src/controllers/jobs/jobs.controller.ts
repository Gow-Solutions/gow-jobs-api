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
  async insertOrUpdateJob(@Param('jobId') jobId: number, @Body() jobBody: Job) {
    if (jobId != jobBody.jobId) {
      throw new BadRequestException('Job Id diferente do passado na URL.');
    }

    await this.jobsService.createOrUpdate(jobBody);
  }
}
