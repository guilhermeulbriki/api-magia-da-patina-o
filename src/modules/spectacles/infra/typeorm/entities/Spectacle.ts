import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('spectacles')
class Spectacle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  theme: string;

  @Column()
  local: string;

  @Column('int4')
  public: number;

  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Spectacle;
