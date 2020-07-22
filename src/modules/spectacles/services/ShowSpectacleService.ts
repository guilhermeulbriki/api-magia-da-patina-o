import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import ISpectacleRepository from '@modules/spectacles/repositories/ISpectacleRepository';

import Spectacle from '../infra/typeorm/entities/Spectacle';

@injectable()
class ShowSpectacleService {
  constructor(
    @inject('SpectacleRepository')
    private spectacleRepository: ISpectacleRepository,
  ) {}

  public async execute(id: string): Promise<Spectacle | undefined> {
    const spectacle = await this.spectacleRepository.findById(id);

    if (!spectacle) {
      throw new AppError('Show não encontrado');
    }

    return spectacle;
  }
}

export default ShowSpectacleService;
