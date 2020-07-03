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
import Group from '@modules/groups/infra/typeorm/entities/Groups';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  sponsor_id: string;

  @ManyToOne(() => Sponsor)
  @JoinColumn({ name: 'sponsor_id' })
  sponsor: Sponsor;

  @Column()
  group_id: string;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;
}

export default Student;
