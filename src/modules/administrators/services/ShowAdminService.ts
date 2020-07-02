import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IAdminRepository from '@modules/administrators/repositories/IAdminRepository';

import Admin from '../infra/typeorm/entities/Admin';

@injectable()
class ListAdminsService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,
  ) {}

  public async execute(id: string): Promise<Admin> {
    const admin = await this.adminRepository.findById(id);

    if (!admin) {
      throw new AppError('Administrador não encontrado');
    }

    return admin;
  }
}

export default ListAdminsService;
