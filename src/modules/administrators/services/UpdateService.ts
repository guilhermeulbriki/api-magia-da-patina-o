import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IAdminRepository from '@modules/administrators/repositories/IAdminRepository';

import IHashProvider from '@modules/sponsors/providers/HashProvider/models/IHashProvider';
import Admin from '../infra/typeorm/entities/Admin';

interface IRequestDTO {
  id: string;
  password: string;
  newPassword?: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
}

@injectable()
class UpdateAdminService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(data: IRequestDTO): Promise<Admin> {
    const admin = await this.adminRepository.findById(data.id);

    if (!admin) {
      throw new AppError('Administrador não encontrado');
    }

    const checkSponsorExists = await this.adminRepository.findByEmail(
      data.email,
    );

    if (checkSponsorExists && data.email !== admin.email) {
      throw new AppError('Este email já está sendo usado');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      data.password,
      admin.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect password.', 401);
    }

    if (data.newPassword) {
      admin.password = await this.hashProvider.generateHash(data.newPassword);
    } else {
      admin.password = data.password;
    }

    admin.name = data.name;
    admin.email = data.email;
    admin.phone = data.phone;
    admin.whatsapp = data.whatsapp;

    return this.adminRepository.save(admin);
  }
}

export default UpdateAdminService;
