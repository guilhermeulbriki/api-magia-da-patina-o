import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import ISpectacleRepository from '@modules/spectacles/repositories/ISpectacleRepository';

import Spectacle from '../infra/typeorm/entities/Spectacle';

interface IRequestDTO {
  id: string;
  theme: string;
  date: Date;
  local: string;
  public: number;
}

@injectable()
class UpdateSpectacleService {
  constructor(
    @inject('SpectacleRepository')
    private spectacleRepository: ISpectacleRepository,
  ) {}

  public async execute(data: IRequestDTO): Promise<Spectacle> {
    const spectacle = await this.spectacleRepository.findById(data.id);

    if (!spectacle) {
      throw new AppError('Show não encontrado');
    }

    spectacle.theme = data.theme;
    spectacle.date = data.date;
    spectacle.public = data.public;
    spectacle.local = data.local;

    return this.spectacleRepository.save(spectacle);
  }
}

export default UpdateSpectacleService;
