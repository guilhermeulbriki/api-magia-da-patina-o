import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('directors')
class Director {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  president: string;

  @Column()
  vice: string;

  @Column()
  start: Date;

  @Column()
  end: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Director;
