import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Schedule from '@modules/schedules/infra/typeorm/entities/Schedule';

@Entity('groups')
class Groups {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  color: string;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  instructor: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Schedule, schedule => schedule.group)
  schedules: Schedule[];
}

export default Groups;
