import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

interface IAddressAsJson {
  street: string;
  neighborhood: string;
  complement: string;
  number: number;
  cep: number;
  city: string;
}

@Entity('sponsors')
class Sponsor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
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
  born: Date;

  @Column()
  type: string;

  @Column()
  @Exclude()
  address: string;

  @Expose({ name: 'addressAsJson' })
  getAddressAsJson(): IAddressAsJson {
    return JSON.parse(this.address);
  }

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Sponsor;
