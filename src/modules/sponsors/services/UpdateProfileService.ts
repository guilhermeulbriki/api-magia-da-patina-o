import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ISponsorRepository from '@modules/sponsors/repositories/ISponsorRepository';

import getAgeByDate from '@shared/utils/getAgeByDate';
import Sponsors from '../infra/typeorm/entities/Sponsors';

interface IRequestDTO {
  id: string;
  name: string;
  password: string;
  email: string;
  born: Date;
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
class UpdateSponsorService {
  constructor(
    @inject('SponsorRepository')
    private sponsorRepository: ISponsorRepository,
  ) {}

  public async execute(data: IRequestDTO): Promise<Sponsors> {
    const sponsor = await this.sponsorRepository.findById(data.id);

    if (!sponsor) {
      throw new AppError('Responsável não encontrado');
    }

    const checkSponsorExists = await this.sponsorRepository.findByEmail(
      data.email,
    );

    if (checkSponsorExists && data.email !== sponsor.email) {
      throw new AppError('Este email já está sendo usado');
    }

    const checkCpfIsAvailable = await this.sponsorRepository.findByCpf(
      data.cpf,
    );

    if (checkCpfIsAvailable && data.cpf !== sponsor.cpf) {
      throw new AppError('Este cpf já está sendo usado');
    }

    const checkRgIsAvailable = await this.sponsorRepository.findByRg(data.rg);

    if (checkRgIsAvailable && data.rg !== sponsor.rg) {
      throw new AppError('Este rg já está sendo usado');
    }

    const checkAge = getAgeByDate(data.born);

    if (checkAge < 18) {
      throw new AppError('Você precisar ser maior de idade');
    }

    sponsor.name = data.name;
    sponsor.email = data.email;
    sponsor.born = data.born;
    sponsor.rg = data.rg;
    sponsor.cpf = data.cpf;
    sponsor.phone = data.phone;
    sponsor.whatsapp = data.whatsapp;
    sponsor.gender = data.gender;
    sponsor.type = data.type;
    sponsor.address = JSON.stringify(data.address);

    return this.sponsorRepository.save(sponsor);
  }
}

export default UpdateSponsorService;
