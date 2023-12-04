import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Job {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  applicants: number;

  @Column()
  views: number;

  @Column()
  description: string;
}
