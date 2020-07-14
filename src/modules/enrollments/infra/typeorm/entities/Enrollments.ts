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
}

export default Enrollments;
