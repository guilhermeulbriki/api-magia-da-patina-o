import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ISpectacleRepository from '@modules/spectacles/repositories/ISpectacleRepository';

@injectable()
class DeleteSpectacleService {
  constructor(
    @inject('SpectacleRepository')
    private spectacleRepository: ISpectacleRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const spectacle = await this.spectacleRepository.findById(id);

    if (!spectacle) {
      throw new AppError('show não encontrado');
    }

    await this.spectacleRepository.delete(id);
  }
}

export default DeleteSpectacleService;
