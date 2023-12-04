import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Job {
  @PrimaryColumn('int8')
  id: number;

  @Column()
  title: string;

  @Column()
  applicants: number;

  @Column()
  views: number;

  @Column()
  description: string;
}
