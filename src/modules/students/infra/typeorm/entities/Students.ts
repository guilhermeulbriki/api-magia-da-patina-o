import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Sponsor from '@modules/sponsors/infra/typeorm/entities/Sponsors';
import { Exclude } from 'class-transformer';

@Entity('students')
class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  rg: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  whatsapp: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column()
  group: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  sponsor_id: string;

  @ManyToOne(() => Sponsor)
  @JoinColumn({ name: 'sponsor_id' })
  sponsor: Sponsor;
}

export default Student;
