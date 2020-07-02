import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IAdminRepository from '@modules/administrators/repositories/IAdminRepository';

@injectable()
class DeleteAdminService {
  constructor(
    @inject('AdminRepository')
    private adminRepository: IAdminRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const admin = await this.adminRepository.findById(id);

    if (!admin) {
      throw new AppError('Responsável não encontrado');
    }

    await this.adminRepository.delete(id);
  }
}

export default DeleteAdminService;
