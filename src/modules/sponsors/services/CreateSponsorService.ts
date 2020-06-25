import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ISponsorRepository from '@modules/sponsors/repositories/ISponsorRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import Sponsors from '../infra/typeorm/entities/Sponsors';

interface IRequestDTO {
  name: string;
  password: string;
  email: string;
  born: string;
  rg: string;
  cpf: string;
  phone: string;
  whatsapp: string;
  gender: 'masculino' | 'feminino';
  type: string;
  address: {
    street: string;
    neighborhood: string;
    complement: string;
    number: number;
    cep: number;
    city: string;
  };
}

@injectable()
class CreateSponsorService {
  constructor(
    @inject('SponsorRepository')
    private sponsorRepository: ISponsorRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IRequestDTO): Promise<Sponsors> {
    const checkSponsorExists = await this.sponsorRepository.findByEmail(
      data.email,
    );

    if (checkSponsorExists) {
      throw new AppError('Este email já está sendo usado');
    }
    const checkCpfIsAvailable = await this.sponsorRepository.findByCpf(
      data.cpf,
    );

    if (checkCpfIsAvailable) {
      throw new AppError('Este cpf já está sendo usado');
    }
    const checkRgIsAvailable = await this.sponsorRepository.findByRg(data.rg);

    if (checkRgIsAvailable) {
      throw new AppError('Este rg já está sendo usado');
    }

    const hashedPassword = await this.hashProvider.generateHash(data.password);

    const formateData = {
      name: data.name,
      password: hashedPassword,
      email: data.email,
      born: data.born,
      rg: data.rg,
      cpf: data.cpf,
      phone: data.phone,
      whatsapp: data.whatsapp,
      gender: data.gender,
      type: data.type,
      address: JSON.stringify(data.address),
    };

    const user = await this.sponsorRepository.create(formateData);

    return user;
  }
}

export default CreateSponsorService;
