import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Applicant } from './applicants.entity';

@Entity()
export class Job {
  @PrimaryColumn({ name: 'job_id', type: 'int8' })
  jobId: number;

  @Column()
  title: string;

  @Column({ name: 'appl_count' })
  applCount: number;

  @Column()
  views: number;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Applicant, (a) => a.job)
  applicants: Applicant[];
}
