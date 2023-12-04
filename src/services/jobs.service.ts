import { InjectRepository } from '@nestjs/typeorm';
import { Job } from '../entities/jobs.entity';
import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private readonly repository: Repository<Job>,
  ) {}

  async createOrUpdate(job: DeepPartial<Job>) {
    const saved = await this.repository.upsert(job, {
      conflictPaths: ['id'],
      skipUpdateIfNoValuesChanged: true,
    });
    return saved;
  }
}
