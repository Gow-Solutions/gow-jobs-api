import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Applicant } from './applicants.entity';

@Entity()
export class Job {
  @PrimaryColumn({ name: 'job_id', type: 'int8' })
  jobId: number;

  @Column()
  title: string;

  @Column()
  appl_count: number;

  @Column()
  views: number;

  @Column()
  description: string;

  @OneToMany(() => Applicant, (a) => a.job)
  applicants: Applicant[];
}
