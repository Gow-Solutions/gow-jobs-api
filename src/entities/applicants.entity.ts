import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Job } from './jobs.entity';

@Entity()
export class Applicant {
  @PrimaryColumn({ name: 'appl_id', type: 'int8' })
  applId: number;

  @Column()
  name: string;

  @Column()
  img: string;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  email: string;

  @Column()
  linkedin: string;

  @Column()
  phone: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Job, (j) => j.applicants)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @OneToMany(() => ProfessionalExperience, (p) => p.applId)
  professionalExperiences: ProfessionalExperience[];

  @OneToMany(() => AcademicExperience, (a) => a.applId)
  academicExperiences: AcademicExperience[];
}

@Entity()
export class ProfessionalExperience {
  @PrimaryGeneratedColumn({ name: 'prof_id' })
  profId: number;

  @Column()
  img: string;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column()
  period: string;

  @ManyToOne(() => Applicant, (applicant) => applicant.professionalExperiences)
  @JoinColumn({ name: 'appl_id' })
  applId: number;

  //   @ManyToOne(() => Applicant, (applicant) => applicant.professionalExperiences)
  //   @JoinColumn({ name: 'appl_id' })
  //   applicant: Applicant;
}

@Entity()
export class AcademicExperience {
  @PrimaryGeneratedColumn({ name: 'acad_id' })
  acadId: number;

  @Column()
  img: string;

  @Column()
  institution: string;

  @Column()
  course: string;

  @Column()
  period: string;

  @JoinColumn({ name: 'appl_id' })
  @ManyToOne(() => Applicant, (applicant) => applicant.academicExperiences)
  applId: number;
}
