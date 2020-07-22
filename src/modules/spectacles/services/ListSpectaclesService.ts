import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import { injectable, inject } from 'tsyringe';

import ISpectacleRepository from '@modules/spectacles/repositories/ISpectacleRepository';

import Spectacle from '../infra/typeorm/entities/Spectacle';

interface IRequestDTO {
  order: string;
  skip: number;
}

@injectable()
class ListSpectaclesService {
  constructor(
    @inject('SpectacleRepository')
    private spectacleRepository: ISpectacleRepository,
  ) {}

  public async execute({ order, skip }: IRequestDTO): Promise<Spectacle[]> {
    const page = (skip - 1) * 3;

    if (order !== 'DESC' && order !== 'ASC') {
      throw new AppError('Formato invalido');
    }

    return this.spectacleRepository.list({
      order,
      page,
    });
  }
}

export default ListSpectaclesService;
