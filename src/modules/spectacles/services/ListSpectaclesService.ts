import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import ISpectacleRepository from '@modules/spectacles/repositories/ISpectacleRepository';

import Spectacle from '../infra/typeorm/entities/Spectacle';

@injectable()
class ListSpectaclesService {
  constructor(
    @inject('SpectacleRepository')
    private spectacleRepository: ISpectacleRepository,
  ) {}

  public async execute(order: string): Promise<Spectacle[]> {
    if (order !== 'DESC' && order !== 'ASC') {
      throw new AppError('Formato invalido');
    }

    return this.spectacleRepository.list({
      order,
    });
  }
}

export default ListSpectaclesService;
