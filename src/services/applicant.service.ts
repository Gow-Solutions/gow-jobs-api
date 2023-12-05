import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import {
  AcademicExperience,
  Applicant,
  ProfessionalExperience,
} from 'src/entities/applicants.entity';

@Injectable()
export class ApplicantsService {
  constructor(
    @InjectRepository(Applicant)
    private readonly repository: Repository<Applicant>,
    @InjectRepository(AcademicExperience)
    private readonly academicExpRepository: Repository<AcademicExperience>,
    @InjectRepository(ProfessionalExperience)
    private readonly professionalExpRepository: Repository<ProfessionalExperience>,
  ) {}

  async createOrUpdate(applicant: DeepPartial<Applicant>) {
    const saved = await this.repository.upsert(applicant, {
      conflictPaths: ['applId'],
      skipUpdateIfNoValuesChanged: true,
    });

    if (
      applicant.academicExperiences &&
      applicant.academicExperiences.length > 0
    ) {
      applicant.academicExperiences.forEach(
        (a) => (a.applId = +saved.identifiers[0].applId),
      );

      await this.academicExpRepository.delete({ applId: applicant.applId });
      await this.academicExpRepository.save(applicant.academicExperiences);
    }

    if (
      applicant.professionalExperiences &&
      applicant.professionalExperiences.length > 0
    ) {
      applicant.professionalExperiences.forEach(
        (a) => (a.applId = +saved.identifiers[0].applId),
      );

      await this.professionalExpRepository.delete({ applId: applicant.applId });
      await this.professionalExpRepository.save(
        applicant.professionalExperiences,
      );
    }

    return saved;
  }

  // async get(jobId: number): Promise<Job> {
  //   const job = await this.repository.findOneByOrFail({ jobId: jobId });
  //   return job;
  // }
}
