import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsController } from './jobs/jobs.controller';
import { ApplicantsController } from './applicants/applicants.controller';

@Module({
  imports: [],
  controllers: [AppController, JobsController, ApplicantsController],
  providers: [AppService],
})
export class AppModule {}
