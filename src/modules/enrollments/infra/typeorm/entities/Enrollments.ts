import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Column,
  OneToOne,
} from 'typeorm';

import Student from '@modules/students/infra/typeorm/entities/Students';
import { Expose } from 'class-transformer';
import { getYear, isBefore } from 'date-fns';

@Entity('enrollments')
class Enrollments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int4')
  number: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  student_id: string;

  @OneToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @Expose({ name: 'status' })
  getStatus(): 'pending' | 'ok' {
    const currentDate = new Date(Date.now());
    const lastStartedSession = new Date(getYear(currentDate), 0, 1);

    if (isBefore(this.updated_at, lastStartedSession)) {
      return 'pending';
    }

    return 'ok';
  }
}

export default Enrollments;
