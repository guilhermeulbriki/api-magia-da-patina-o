import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IDirectorsRepository from '@modules/directors/repositories/IDirectorsRepository';

@injectable()
class DeleteDirectorService {
  constructor(
    @inject('DirectorsRepository')
    private directorsRepository: IDirectorsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const director = await this.directorsRepository.findById(id);

    if (!director) {
      throw new AppError('Diretoria não encontrada');
    }

    await this.directorsRepository.delete(id);
  }
}

export default DeleteDirectorService;
