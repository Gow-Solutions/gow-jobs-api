import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { JobsController } from './controllers/jobs/jobs.controller';
import { ApplicantsController } from './controllers/applicants/applicants.controller';
import { JobsService } from './services/jobs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPostgresConfigService } from './typeorm.config';
import { Job } from './entities/jobs.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmPostgresConfigService }),
    TypeOrmModule.forFeature([Job]),
  ],
  controllers: [AppController, JobsController, ApplicantsController],
  providers: [AppService, JobsService],
})
export class AppModule {}
