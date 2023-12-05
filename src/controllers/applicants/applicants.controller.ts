import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import {
  AcademicExperience,
  Applicant,
  ProfessionalExperience,
} from 'src/entities/applicants.entity';
import { ApplicantsService } from 'src/services/applicant.service';
import { JobsService } from 'src/services/jobs.service';
import { EntityNotFoundError } from 'typeorm';

type ApplicantInfoDto = {
  title: string;
  items: string[][];
};

type ApplicantDto = {
  email: string;
  linkedin: string;
  phone: string;
  resume: string;
  infos: ApplicantInfoDto[];
  jobId: number;
  applId: number;
  name: string;
  img: string;
  title: string;
  location: string;
};

@Controller()
export class ApplicantsController {
  constructor(
    private readonly jobService: JobsService,
    private readonly applicantsService: ApplicantsService,
    private readonly logger: Logger,
  ) {}

  @Put('/jobs/:jobId/applicant/:applId')
  async createOrUpdate(
    @Body() applDto: ApplicantDto,
    @Param('jobId') jobId: number,
    @Param('applId') applId: number,
  ) {
    if (applDto.applId != applId) {
      throw new BadRequestException(
        'Applicant ID diferente do enviado na URL.',
      );
    }

    if (applDto.jobId != jobId) {
      throw new BadRequestException('Job ID diferente do enviado na URL.');
    }

    try {
      const applicant = await this.applicantBuilder(applDto);

      const saved = await this.applicantsService.createOrUpdate(applicant);

      this.logger.log('Operação realizada com sucesso', [applicant, saved]);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Job não existe na base de dados.');
      }
      this.logger.error(error);
      throw new InternalServerErrorException(
        'Algum erro ocorreu em nossos servidores, tente novamente.',
      );
    }
  }

  private async applicantBuilder(dto: ApplicantDto): Promise<Applicant> {
    const job = await this.jobService.get(dto.jobId);

    const applicant: Applicant = {
      applId: dto.applId,
      email: dto.email,
      img: dto.img,
      linkedin: dto.linkedin,
      location: dto.location,
      name: dto.name,
      phone: dto.phone,
      title: dto.title,
      job: job,
      academicExperiences: [],
      professionalExperiences: [],
    };

    const professionalMapper = ([img, title, company, period]: string[]) => {
      const profExp: ProfessionalExperience = {
        company,
        period,
        img,
        title,
        profId: 0,
        applId: 0,
      };
      applicant.professionalExperiences.push(profExp);
    };

    const academicMapper = ([img, institution, course, period]: string[]) => {
      const acadExp: AcademicExperience = {
        institution,
        period,
        img,
        course,
        acadId: 0,
        applId: 0,
      };
      applicant.academicExperiences.push(acadExp);
    };

    dto.infos
      .filter((i) => i.title == 'Experiência')
      .forEach((i) => i.items.map(professionalMapper));

    dto.infos
      .filter((i) => i.title == 'Formação acadêmica')
      .forEach((i) => i.items.map(academicMapper));

    return applicant;
  }
}
