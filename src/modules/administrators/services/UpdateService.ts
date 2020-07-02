import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IAdminRepository from '@modules/administrators/repositories/IAdminRepository';

import Admin from '../infra/typeorm/entities/Admin';

interface IRequestDTO {
  id: string;
  password: string;
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

    admin.name = data.name;
    admin.email = data.email;
    admin.password = data.password;
    admin.phone = data.phone;
    admin.whatsapp = data.whatsapp;

    return this.adminRepository.save(admin);
  }
}

export default UpdateAdminService;
