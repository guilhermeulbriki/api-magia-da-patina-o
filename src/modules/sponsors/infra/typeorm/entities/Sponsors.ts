import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sponsors')
class Sponsor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

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
  born: string;

  @Column()
  type: string;

  @Column()
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Sponsor;
