import { Body, Controller, Param, Put } from '@nestjs/common';

type JobDto = {
  title: string;
  applicants: number;
  views: number;
  description: string;
  jobId: string;
};

@Controller('jobs')
export class JobsController {
  @Put(':jobId') // https://www.linkedin.com/hiring/jobs/3775564708/detail/
  async insertOrUpdateJob(
    @Param('jobId') jobId: string,
    @Body() jobBody: JobDto,
  ) {
    return {
      jobId,
      jobBody,
    };
  }
}
