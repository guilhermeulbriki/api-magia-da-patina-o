import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IAdminRepository from '@modules/administrators/repositories/IAdminRepository';
import IHashProvider from '@modules/sponsors/providers/HashProvider/models/IHashProvider';

import Admin from '../infra/typeorm/entities/Admin';

interface IRequestDTO {
  data: {
    name: string;
    password: string;
    email: string;
    phone: string;
    whatsapp: string;
  };
  acessCode: string;
}

@injectable()
class CreateAdminService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ data, acessCode }: IRequestDTO): Promise<Admin> {
    const checkAdminExists = await this.adminRepository.findByEmail(data.email);

    if (checkAdminExists) {
      throw new AppError('Este email já está sendo usado');
    }

    if (acessCode !== process.env.ACESS_CODE) {
      throw new AppError('Código de acesso invalido');
    }

    const hashedPassword = await this.hashProvider.generateHash(data.password);

    const formateData = {
      name: data.name,
      password: hashedPassword,
      email: data.email,
      phone: data.phone,
      whatsapp: data.whatsapp,
    };

    return this.adminRepository.create(formateData);
  }
}

export default CreateAdminService;
