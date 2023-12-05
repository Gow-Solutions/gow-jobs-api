import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Logger } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import {
  AcademicExperience,
  Applicant,
  ProfessionalExperience,
} from 'src/entities/applicants.entity';

@Injectable()
export class ApplicantsService {
  constructor(
    private readonly logger: Logger,
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

    await this.saveAcademicExperience(applicant);
    await this.saveProfessionalExperience(applicant);

    return saved;
  }

  private async saveProfessionalExperience(applicant: DeepPartial<Applicant>) {
    if (
      applicant.professionalExperiences &&
      applicant.professionalExperiences.length > 0
    ) {
      await this.professionalExpRepository.delete({ applId: applicant.applId });

      for (const exp of applicant.professionalExperiences) {
        try {
          await this.professionalExpRepository.save(exp);
        } catch (err) {
          this.logger.error('Falha ao salvar experiência profissional.', [
            exp,
            err,
          ]);
        }
      }
    }
  }

  private async saveAcademicExperience(applicant: DeepPartial<Applicant>) {
    if (
      applicant.academicExperiences &&
      applicant.academicExperiences.length > 0
    ) {
      await this.academicExpRepository.delete({ applId: applicant.applId });

      for (const exp of applicant.academicExperiences) {
        try {
          await this.academicExpRepository.save(exp);
        } catch (err) {
          this.logger.error('Falha ao salvar formação acadêmica. ', [exp, err]);
        }
      }
    }
  }
}
